import { Component, NgModule, Input, Output, EventEmitter, forwardRef } from "@angular/core";
import { AbstractJigsawComponent } from "jigsaw/common/common";
import { JigsawInputModule } from "./input";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CommonUtils } from "jigsaw/common/core/utils/common-utils";
import { TranslateService } from '@ngx-translate/core';
import { InternalUtils } from 'jigsaw/common/core/utils/internal-utils';

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
    public placeholder: string = "";

    private value: string;

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
    public _$valueChange($event) {
        if (!this.autoSearch) {
            return;
        }
        if (this._isValidSearchDebounce()) {
            // 输入3000ms没有回车也会发一次事件
            this._debounceSearch($event);
        } else {
            this.search.emit($event);
        }
    }

    private _searchTimer: number;

    /**
     * @internal
     */
    public _$enterSearch($event) {
        $event.preventDefault();
        $event.stopPropagation();
        if (this._isValidSearchDebounce()) {
            this._clearSearchTimer();
            this.search.emit(this.value);
        }
    }

    private _debounceSearch(key: string) {
        this._clearSearchTimer();
        this._searchTimer = this.callLater(() => {
            this.search.emit(key);
        }, this.searchDebounce);
    }

    private _isValidSearchDebounce(): boolean {
        return Number(this.searchDebounce) > 0;
    }

    private _clearSearchTimer() {
        if (this._searchTimer) {
            clearTimeout(this._searchTimer);
            this._searchTimer = null;
        }
    }

    /**
     * @internal
     */
    public _$searchBtnClicked($event) {
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

    /**
     * 国际化
     */
    public searchText = this._translateService.instant("search.search");
}

@NgModule({
    imports: [JigsawInputModule],
    declarations: [JigsawSearchInput],
    exports: [JigsawSearchInput],
    providers: [TranslateService]
})
export class JigsawSearchInputModule {

    constructor(translateService: TranslateService) {
        InternalUtils.initI18n(translateService, 'search', {
            zh: {
                search: "搜索"
            },
            en: {
                search: 'Search'
            }
        });
        translateService.setDefaultLang(translateService.getBrowserLang());
    }

}
