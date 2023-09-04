import {
    Component,
    NgModule,
    Input,
    Output,
    EventEmitter,
    forwardRef,
    ChangeDetectionStrategy,
    Injector,
    ViewChild,
    TemplateRef,
    ChangeDetectorRef
} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {TranslateService, TranslateModule} from "@ngx-translate/core";
import {Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {AbstractJigsawComponent, WingsTheme} from "../../common/common";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {TranslateHelper} from '../../common/core/utils/translate-helper';
import {RequireMarkForCheck} from '../../common/decorator/mark-for-check';
import {FloatPosition, JigsawFloatModule} from '../../common/directive/float/float';
import {JigsawListModule} from '../list-and-tile/list';
import {JigsawAutoCompleteInputModule} from './auto-complete-input';

@WingsTheme('search-input.scss')
@Component({
    selector: "jigsaw-search-input, j-search-input",
    templateUrl: "search-input.html",
    host: {
        "[style.width]": "width",
        "[style.height]": "height",
        '[attr.data-theme]': 'theme',
        "[class.jigsaw-search-input-host]": "true",
        "[class.jigsaw-search-input-auto]": "autoSearch",
        "[class.jigsaw-search-input-disabled]": "disabled"
    },
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawSearchInput), multi: true}],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawSearchInput extends AbstractJigsawComponent implements ControlValueAccessor {
    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        private _translateService: TranslateService,
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
     * 设置是否可以清除
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public clearable: boolean = true;

    /**
     * 设置是否显示边框
     * @NoMarkForCheckRequired
     */
    @Input()
    public showBorder: boolean = true;

    public _$placeholder: string = this._translateService.instant("search-input.placeholder");
    private _placeholder: string;

    /**
     * 输入框的placeholder
     */
    @RequireMarkForCheck()
    @Input()
    public get placeholder(): string {
        return this._$placeholder;
    }

    public set placeholder(newValue: string) {
        if (this._placeholder === newValue) {
            return;
        }
        this._placeholder = newValue;
        this._$placeholder = CommonUtils.isUndefined(this._placeholder) ?
            this._translateService.instant("search-input.placeholder") : this._placeholder;
    }


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
        this._value = newValue.trim();
        this.valueChange.emit(this._value);
        // 表单友好接口
        this._propagateChange(this._value);
    }

    @Output()
    public valueChange: EventEmitter<string> = new EventEmitter<string>();

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
     * @NoMarkForCheckRequired
     */
    @Input()
    public maxDropDownHeight: string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public maxDropDownWidth: string;

    public clearHistory(): void {
        if (!this.historyStorageKey) {
            return;
        }
        localStorage.removeItem(this.historyStorageKey);
        this._$history.length = 0;
        this.value = '';
    }

    /**
     * @internal
     */
    public _$enterSearch() {
        this.search.emit(this.value);
        this._saveSearchHistory(this.value);
    }

    /**
     * @internal
     */
    @ViewChild('jigsawFloatArea')
    public _$jigsawFloatArea: TemplateRef<any>;

    /**
     * 用户用于设置存在localStorage中历史记录的key值
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public historyStorageKey: string = 'jigsawSearchInputHistory';

    /**
     * @internal
     */
    public _$history: string[] = [];

    /**
     * 用户用于设置存在localStorage中历史记录的记录条数
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public historyStorageSize: number = 20;

    /**
     * 用户用于设置存在localStorage中历史记录的单条文本长度
     */
    private _maxHistoryItemLength: number = 200;

    private _isHistorySelected = false;

    private _saveSearchHistory(value: string) {
        if (CommonUtils.isUndefined(value) || value.length === 0 || value.length > this._maxHistoryItemLength) {
            return;
        }

        if (this._$history.length === 0) {
            /* 当历史记录为空时，auto-complete-input无法绑定_$history */
            this._$history = new Array(value);
            this._changeDetectorRef.detectChanges();
        } else {
            const index = this._$history.indexOf(value);
            if (index !== -1) {
                this._$history.splice(index, 1)
            }
            this._$history.unshift(value);
        }

        if (this._$history.length > this.historyStorageSize) {
            this._$history = this._$history.slice(0, this.historyStorageSize)
        }
        localStorage.setItem(this.historyStorageKey, JSON.stringify(this._$history));
    }

    /**
     * 用户用于设置历史记录弹出的位置
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public floatPosition: FloatPosition = 'bottomLeft';

    /**
     * @internal
     */
    public _$valueChange($event) {
        if (!this.autoSearch) {
            if (this._isHistorySelected) {
                this._isHistorySelected = !this._isHistorySelected;
            }
            return;
        }
        if (this._isValidSearchDebounce()) {
            this._debounceSearch();
            this.valueChange.emit($event);
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

        this._valueChangeSubscription = this.valueChange
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
        if (this.autoSearch) {
            this._saveSearchHistory(this.value);
        }
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
    private _propagateChange: any = () => {
    };

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    private _onTouched: any = () => {
    };

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
            this._$history = JSON.parse(history);
        }

        //国际化
        TranslateHelper.languageChangEvent.subscribe(langInfo => {
            if (CommonUtils.isDefined(this._placeholder)) {
                return;
            }
            this._translateService.use(langInfo.curLang);
            this._$placeholder = this._translateService.instant("search-input.placeholder")
        })
    }
}

@NgModule({
    imports: [CommonModule, JigsawAutoCompleteInputModule, JigsawFloatModule, JigsawListModule, PerfectScrollbarModule, TranslateModule.forChild()],
    declarations: [JigsawSearchInput],
    exports: [JigsawSearchInput],
    providers: [TranslateService]
})
export class JigsawSearchInputModule {
    constructor() {
        TranslateHelper.initI18n("search-input", {
            zh: {
                placeholder: "搜索"
            },
            en: {
                placeholder: "Search"
            }
        });
    }
}
