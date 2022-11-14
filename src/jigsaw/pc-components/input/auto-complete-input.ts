import {debounceTime} from "rxjs/operators";
import {Subscription} from "rxjs";
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    NgModule,
    NgZone,
    OnDestroy,
    Output,
    TemplateRef,
    ViewChild,
    Injector
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawInput, JigsawInputBase, JigsawInputModule} from "./input";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {FloatPosition, JigsawFloat, JigsawFloatModule} from "../../common/directive/float/float";
import {WingsTheme} from "../../common/common";

export class DropDownValue {
    constructor(data = null) {
        if (data) {
            for (let attrItem in data) {
                if (!data.hasOwnProperty(attrItem)) {
                    continue;
                }
                this[attrItem] = data[attrItem];
            }
        }
    }

    category?: string;
    items?: string[];
}

/**
 * 自动完成输入框
 *
 * $demo = auto-complete-input/non-group
 */
@WingsTheme('auto-complete-input.scss')
@Component({
    selector: 'jigsaw-auto-complete-input, j-auto-complete-input',
    templateUrl: 'auto-complete-input.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-auto-complete-input-host]': 'true'
    },
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawAutoCompleteInput), multi: true },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawAutoCompleteInput extends JigsawInputBase implements OnDestroy, AfterViewInit {
    constructor(protected _cdr: ChangeDetectorRef, protected _zone: NgZone,
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
        super(_cdr, _injector, _zone);
    }

    @ViewChild(JigsawFloat)
    private _dropdownFloat: JigsawFloat;

    /**
     * @internal
     */
    public _$data: string[] | DropDownValue[];
    /**
     * @internal
     */
    public _bakData: any[];

    /**
     * @internal
     */
    public _$propertyListOpen: boolean | null = null;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public closeDropDownOnSelect: boolean = true;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public floatPosition: FloatPosition = 'bottomLeft';

    /**
     * @internal
     */
    public _$maxDropDownHeight: string = '300px';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get maxDropDownHeight(): string {
        return this._$maxDropDownHeight;
    }

    public set maxDropDownHeight(value: string) {
        if (value == this._$maxDropDownHeight || !value) {
            return;
        }
        this._$maxDropDownHeight = CommonUtils.getCssValue(value);
    }

    /**
     * @internal
     */
    public _$maxDropDownWidth: string = this.width;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get maxDropDownWidth(): string {
        return this._$maxDropDownWidth;
    }

    public set maxDropDownWidth(value: string) {
        if (value == this._$maxDropDownWidth || !value) {
            return;
        }
        this._$maxDropDownWidth = CommonUtils.getCssValue(value);
    }

    /**
     * 下拉提示数据，支持简单字符串列表，也可以支持带分类的结构数据
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get data(): string[] | DropDownValue[] {
        return this._$data;
    }

    public set data(value: string[] | DropDownValue[]) {
        if (value == this._$data) {
            return;
        }

        value = value || [];
        if (typeof value[0] == 'string' || typeof value[0] == 'number') {
            this._$data = [new DropDownValue({category: '', items: value})];
        } else {
            this._$data = value;
        }
        [...this._bakData] = this._$data;
    }

    /**
     * 用于控制在输入框获得焦点后是否自动执行过滤
     *
     * @NoMarkForCheckRequired
     *
     * $demo = auto-complete-input/with-group
     */
    @Input()
    public filterOnFocus: boolean = false;

    @ViewChild('dropDownTemp')
    private _dropDownTemp: TemplateRef<any>;

    @ViewChild('input')
    private _input: JigsawInput;

    public focus() {
        this._input.focus();
    }

    public select() {
        this._input.select();
    }

    public openDropdown(): void {
        if (this._dropdownFloat) {
            this._dropdownFloat.openFloat();
            this.focus();
        }
    }

    public closeDropdown(): void {
        if (this._dropdownFloat) {
            this._dropdownFloat.closeFloat();
        }
    }

    /**
     * 下拉提示内容被选中时，会发出`select`事件，此事件可用于区分用户手工输入的还是选择的
     *
     * $demo = auto-complete-input/select-event
     */
    @Output('select')
    public selectEvent = new EventEmitter<string>();

    @Output('textSelect')
    public textSelectEvent = new EventEmitter<Event>();

    ngAfterViewInit() {
        this._subscribeKeydownEvent();
    }

    /**
     * @internal
     */
    private _getFilteredDropDownData(shouldFilter: boolean) {
        let filterKey = shouldFilter ? this._input.value : '';
        filterKey = filterKey ? filterKey.trim() : '';
        let data: any = [];
        data = this._bakData ? this._bakData.reduce((arr, category) => {
            let result = this._filter(category, filterKey);
            if (result) {
                arr.push(result);
            }
            return arr;
        }, data) : [];
        this._$data = data;

        if (this._$propertyListOpen !== null) {
            this._$propertyListOpen = data.length > 0;
        }
        if (this._$propertyListOpen) {
            this.runAfterMicrotasks(() => {
                this._zone.run(() => {
                    this._dropdownFloat.reposition();
                    this._cdr.markForCheck();
                    const dropdown = document.querySelector(".jigsaw-auto-complete-input-list-box");
                    if (dropdown) {
                        dropdown.scrollTop = 0;
                    }
                })
            });
        }
    }

    private _filter(category: DropDownValue, key): DropDownValue {
        let items = category.items.filter(item => String(item).toLowerCase().includes(key.toLowerCase()));
        if (items.length == 0) {
            return null;
        }
        return new DropDownValue({
            category: category.category,
            items: items
        });
    }

    /**
     * @internal
     */
    public _$handleFocus(event: FocusEvent) {
        super._$handleFocus(event);
        this._getFilteredDropDownData(this.filterOnFocus);
        this._$propertyListOpen = true;
    }

    /**
     * @internal
     */
    public _$handleBlur(event: FocusEvent) {
        super._$handleBlur(event);
        this._$propertyListOpen = false;
        this._unsubscribeKeydownEvent();
    }

    /**
     * @internal
     */
    public _$handleSelect($event: Event) {
        $event.stopPropagation();
        this.textSelectEvent.emit($event);
    }

    /**
     * @internal
     */
    public _$add(event, item) {
        event.preventDefault();
        event.stopPropagation();

        this._unsubscribeKeydownEvent();
        this.value = item;

        this.selectEvent.emit(item);
    }

    private _keydownEvent = new EventEmitter();
    private _keydownSubscription: Subscription;

    private _subscribeKeydownEvent(): void {
        if (this._keydownSubscription) {
            return;
        }

        this._keydownSubscription = this._keydownEvent
            .pipe(debounceTime(300))
            .subscribe((res) => {
                if(res.keyCode !== 13) {
                    this._getFilteredDropDownData(true);
                }
            });
    }

    private _unsubscribeKeydownEvent(): void {
        if (!this._keydownSubscription) {
            return;
        }
        this._keydownSubscription.unsubscribe();
        this._keydownSubscription = null;
    }

    /**
     * @internal
     */
    public _$onKeyDown(event) {
        if (event.keyCode == 27) {
            this._$propertyListOpen = false;
            this._unsubscribeKeydownEvent();
            return;
        }

        if (!this._keydownSubscription) {
            this._subscribeKeydownEvent();
        }
        this._keydownEvent.emit(event);
    }

    /**
     * @internal
     */
    public _$preventInputBlur(event) {
        if (this.closeDropDownOnSelect) {
            return;
        }
        // 阻止触发input框的blur
        event.preventDefault();
        event.stopPropagation();
    }

    public ngOnDestroy() {
        super.ngOnDestroy();
        this._$propertyListOpen = false;
        this._unsubscribeKeydownEvent();
    }
}

@NgModule({
    imports: [CommonModule, FormsModule, JigsawInputModule, PerfectScrollbarModule, JigsawFloatModule],
    declarations: [JigsawAutoCompleteInput],
    exports: [JigsawAutoCompleteInput],
})
export class JigsawAutoCompleteInputModule {
}
