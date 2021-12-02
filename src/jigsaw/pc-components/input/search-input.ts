import { Component, NgModule, Input, Output, EventEmitter, forwardRef, ChangeDetectionStrategy, Injector, ViewChild, TemplateRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { AbstractJigsawComponent } from "../../common/common";
import { InternalUtils } from "../../common/core/utils/internal-utils";
import { CommonUtils } from "../../common/core/utils/common-utils";
import { JigsawInputModule } from "./input";
import { TranslateHelper } from '../../common/core/utils/translate-helper';
import { RequireMarkForCheck } from '../../common/decorator/mark-for-check';
import { JigsawFloatModule } from '../../common/directive/float/float';
import { CommonModule } from '@angular/common';
import { JigsawListModule } from '../list-and-tile/list';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

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
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawSearchInput), multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawSearchInput extends AbstractJigsawComponent implements ControlValueAccessor {
    constructor(private _translateService: TranslateService,
        // @RequireMarkForCheck 需要用到，勿删
        private _injector: Injector) {
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
     */
    @RequireMarkForCheck()
    @Input()
    public placeholder: string = this._translateService.instant("search-input.placeholder");

    private _value: string;

    /**
     * 文本框中当前的文本
     */
    @RequireMarkForCheck()
    @Input()
    public get value(): string {
        return this._value;
    }

    public set value(newValue: string) {
        if (this._value === newValue) {
            return;
        }
        this._value = newValue;
        // 表单友好接口
        this._propagateChange(this._value);
    }

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
    @ViewChild('jigsawFloatArea')
    public _$jigsawFloatArea: TemplateRef<any>;

    /**
     * historyStorageKey
     * 用户用于设置存在localStorage中历史记录的key值
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public historyStorageKey: string = 'jigsawSearchInputHistory';

    /**
     * @internal
     */
    public _$historyOpen: boolean = false;

    private _history: string[] = [];

    /**
     * @internal
     */
    public _$filteredHistory: string[] = [];

    /**
     * @internal
     */
    public _$searchHistorySelected(value: string) {
        this._$historyOpen = false;
        this.value = value;
        this.search.emit(this.value);
        this._isHistorySelected = true;
    }

    private _isHistorySelected = false;

    private _filterHistoryByKey(value: string) {
        if (CommonUtils.isUndefined(value) || value.trim().length === 0) {
            this._$filteredHistory = this._history;
            return
        }
        this._$filteredHistory = this._history.filter((item) => {
            return item.indexOf(value.trim()) !== -1;
        })
    }

    private _saveSearchHistory(value:string){
        if (CommonUtils.isUndefined(value) || value.trim().length === 0) {
            return;
        }

        if (this._history.indexOf(value.trim()) !== -1) {
            return;
        }

        this._history.unshift(value.trim());
        localStorage.setItem(this.historyStorageKey, JSON.stringify(this._history));
    }

    /**
     * @internal
     */
    public _$deleteHistoryItem(value: string) {
        this._$filteredHistory.splice(this._$filteredHistory.indexOf(value), 1)
        this._history.splice(this._history.indexOf(value), 1);
    }

    /**
     * @internal
     */
    public _$valueChange($event) {
        if (!this.autoSearch) {
            if (this._isHistorySelected){
                this._isHistorySelected = !this._isHistorySelected;
                return; 
            }
            this._filterHistoryByKey($event);
            this._$historyOpen = true;
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
    public _$onBlur() {
        // 表单友好接口
        this._onTouched();
    }

    /**
     * @internal
     */
    public _$searchBtnClicked() {
        this.search.emit(this.value);
        this._saveSearchHistory(this.value);
    }

    public writeValue(value: any): void {
        this.value = CommonUtils.isDefined(value) ? value.toString() : "";
    }

    /**
     * 组件表单友好需支持接口
     */
    private _propagateChange: any = () => { };

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    private _onTouched: any = () => { };

    public registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this._unsubscribeValueChange();
    }

    ngOnInit() {
        super.ngOnInit();

        const history = localStorage.getItem(this.historyStorageKey);
        if (CommonUtils.isDefined(history)) {
            this._history = JSON.parse(history);
        }

        //国际化
        TranslateHelper.languageChangEvent.subscribe(langInfo => {
            this._translateService.use(langInfo.curLang);
            this.placeholder = this._translateService.instant("search-input.placeholder")
        })
    }
}

@NgModule({
    imports: [CommonModule, JigsawInputModule, JigsawFloatModule, JigsawListModule, PerfectScrollbarModule, TranslateModule.forChild()],
    declarations: [JigsawSearchInput],
    exports: [JigsawSearchInput],
    providers: [TranslateService]
})
export class JigsawSearchInputModule {
    constructor(translateService: TranslateService) {
        InternalUtils.initI18n(translateService, "search-input", {
            zh: {
                placeholder: "搜索"
            },
            en: {
                placeholder: "Search"
            }
        });
        translateService.setDefaultLang(translateService.getBrowserLang());
    }
}
