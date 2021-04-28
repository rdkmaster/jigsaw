import { Component, NgModule, Input, Output, EventEmitter, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { AbstractJigsawComponent } from "jigsaw/common/common";
import { InternalUtils } from "jigsaw/common/core/utils/internal-utils";
import { CommonUtils } from "jigsaw/common/core/utils/common-utils";
import { JigsawInputModule } from "./input";

@Component({
    selector: "jigsaw-search-input, j-search-input",
    templateUrl: "search-input.html",
    host: {
        "[style.width]": "width",
        "[style.height]": "height",
        "[class.jigsaw-search-input-host]": "true",
        "[class.jigsaw-search-input-auto]": "autoSearch",
        "[class.jigsaw-search-input-disabled]": "disabled"
    },
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawSearchInput), multi: true }]
})
export class JigsawSearchInput extends AbstractJigsawComponent implements ControlValueAccessor {
    constructor(private _translateService: TranslateService) {
        super();
    }
    /**
     * 设置搜索模式（自动/手动）
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public autoSearch: boolean = true;

    /**
     * 设置不可用
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public disabled: boolean = false;

    /**
     * 输入框的placeholder
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public placeholder: string = this._translateService.instant("search.search");

    @Input()
    public value: string;

    private _valueChange: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    public search: EventEmitter<string> = new EventEmitter<string>();

    /**
     * 设置了此属性会给搜索增加一个防抖功能，并增加enter回车立刻搜索
     * 设为'none'、NaN、小于0，或者不设置则表示不设置防抖
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public searchDebounce: number | "none" = NaN;

    /**
     * @internal
     */
    public _$enterSearch() {
        this.search.emit(this.value);
    }

    /**
     * @internal
     */
    public _$valueChange($event) {
        if (!this.autoSearch) {
            return;
        }
        if (this._isValidSearchDebounce()) {
            this._debounceSearch();
            this._valueChange.emit($event);
        } else {
            this.search.emit($event);
        }
    }

    private _debounceSearch() {
        this._unsubscribeValueChange();
        this._subscribeValueChange();
    }

    private _isValidSearchDebounce(): boolean {
        return Number(this.searchDebounce) > 0;
    }

    private _valueChangeSubscription: Subscription;
    private _subscribeValueChange(): void {
        if (this._valueChangeSubscription) {
            return;
        }

        this._valueChangeSubscription = this._valueChange
            .pipe(debounceTime(Number(this.searchDebounce)))
            .subscribe(() => {
                this.search.emit(this.value);
            });
    }

    private _unsubscribeValueChange(): void {
        if (!this._valueChangeSubscription) {
            return;
        }
        this._valueChangeSubscription.unsubscribe();
        this._valueChangeSubscription = null;
    }

    /**
     * @internal
     */
    public _$searchBtnClicked() {
        this.search.emit(this.value);
    }

    /**
     * @internal
     */
    public _$stopPropagation(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    public writeValue(value: any): void {
        this.value = CommonUtils.isDefined(value) ? value.toString() : "";
    }

    public registerOnChange(fn: any): void {}

    public registerOnTouched(fn: any): void {}

    ngOnDestroy() {
        super.ngOnDestroy();
        this._unsubscribeValueChange();
    }
}

@NgModule({
    imports: [JigsawInputModule, TranslateModule.forChild()],
    declarations: [JigsawSearchInput],
    exports: [JigsawSearchInput],
    providers: [TranslateService]
})
export class JigsawSearchInputModule {
    constructor(translateService: TranslateService) {
        InternalUtils.initI18n(translateService, "search", {
            zh: {
                search: "搜索"
            },
            en: {
                search: "Search"
            }
        });
        translateService.setDefaultLang(translateService.getBrowserLang());
    }
}
