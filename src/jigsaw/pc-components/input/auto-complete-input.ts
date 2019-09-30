import {debounceTime} from "rxjs/operators";
import {
    Component,
    ElementRef,
    forwardRef,
    Input,
    NgModule,
    OnDestroy,
    Renderer2,
    TemplateRef,
    ViewChild,
    Output,
    EventEmitter,
    AfterViewInit
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {JigsawInput, JigsawInputModule} from "./input";
import {PopupInfo, PopupOptions, PopupPositionValue, PopupService} from "../../common/service/popup.service";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {AbstractJigsawComponent, IJigsawFormControl} from "../../common/common";

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
@Component({
    selector: 'jigsaw-auto-complete-input, j-auto-complete-input',
    templateUrl: 'auto-complete-input.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[class.jigsaw-auto-complete-input]': 'true'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawAutoCompleteInput), multi: true},
    ]
})
export class JigsawAutoCompleteInput extends AbstractJigsawComponent implements OnDestroy, AfterViewInit, IJigsawFormControl, ControlValueAccessor {

    /**
     * 输入框的placeholder
     *
     */
    @Input() public placeholder = '';
    /**
     * 在文本框里的文本非空时，是否显示快速清除按钮，默认为显示。用户单击了清除按钮时，文本框里的文本立即被清空。
     *
     */
    @Input() public clearable: boolean = true;

    /**
     * 设置按钮不可交互状态的开关，为true则不可交互，为false则可交互。
     *
     */
    @Input() public disabled: boolean = false;

    /**
     * 当用户输入非法时，组件给予样式上的提示，以提升易用性，常常和表单配合使用。
     *
     */
    @Input() public valid: boolean = true;

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
    public _$maxDropDownHeight: string = '300px';
    private _removeWindowMouseDownListener: Function;

    @Input()
    public set maxDropDownHeight(value: string) {
        if (value == this._$maxDropDownHeight || !value) {
            return;
        }
        this._$maxDropDownHeight = CommonUtils.getCssValue(value);
    }

    @Input()
    public get data(): string[] | DropDownValue[] {
        return this._$data;
    }

    public set data(value: string[] | DropDownValue[]) {
        if (value == this._$data || !value || value.length == 0) {
            return;
        }

        if (typeof value[0] == 'string') {
            this._$data = [new DropDownValue({
                category: '',
                items: value
            })];
        } else {
            this._$data = value;
        }
        [...this._bakData] = this._$data;
    }

    /**
     * 用于控制在输入框获得焦点后是否自动执行过滤
     *
     * $demo = auto-complete-input/with-group
     */
    @Input()
    public filterOnFocus: boolean = true;

    @ViewChild('dropdownTemp', {static: false})
    private _dropdownTemp: TemplateRef<any>;

    @ViewChild('input', {static: false})
    private _input: JigsawInput;

    /**
     * 下拉提示内容被选中时，会发出`select`事件，此事件可用于区分用户手工输入的还是选择的
     *
     * $demo = auto-complete-input/select-event
     */
    @Output('select')
    public selectEvent = new EventEmitter<string>();

    @Output('textSelect')
    public textSelectEvent = new EventEmitter<Event>();

    constructor(private _render2: Renderer2,
                private _elementRef: ElementRef,
                private _popupService: PopupService) {
        super();
    }

    ngAfterViewInit() {
        this._input.valueChange.pipe(debounceTime(300)).subscribe(() => {
            this._getFilteredDropDownData(true);
        });
    }

    /**
     * @internal
     */
    private _getFilteredDropDownData(shouldFilter: boolean) {
        let filterKey = shouldFilter ? this._input.value : '';
        filterKey = filterKey ? filterKey.trim() : '';
        let data: any = [];
        data = this._bakData.reduce((arr, category) => {
            let result = this._filter(category, filterKey);
            if (result) {
                arr.push(result);
            }
            return arr;
        }, data);
        this._$data = data;
    }

    private _filter(category: DropDownValue, key): DropDownValue {
        let items = category.items.filter(item => item.toLowerCase().includes(key.toLowerCase()));
        if (items.length == 0) {
            return null;
        }
        return new DropDownValue({
            category: category.category,
            items: items
        });
    }

    private _value: string = ''; //input表单值

    /**
     * 文本框中当前的文本
     *
     */
    @Input()
    public get value(): string {
        return this._value;
    }

    public set value(newValue: string) {
        if (CommonUtils.isUndefined(newValue) || this._value === newValue) {
            return;
        }
        this._value = newValue;
        this.valueChange.emit(this._value);
        this._propagateChange(this._value);
    }

    private _propagateChange: any = () => {
    };

    public writeValue(value: any): void {
        if (CommonUtils.isUndefined(value)) {
            return;
        }
        this._value = value.toString();
    }

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }

    /**
     * 当文本框中的文本发生变化时，组件会发出此事件。
     *
     * $demo = input/value-change
     */
    @Output()
    public valueChange: EventEmitter<string> = new EventEmitter<string>();

    @Output('focus')
    private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    public focus() {
        this._input.focus();
    }

    /**
     * @internal
     */
    public _$handleFocus(event: FocusEvent) {
        this._getFilteredDropDownData(this.filterOnFocus);
        this._showDropdownList(event);
        this._focusEmitter.emit(event);
    }

    @Output('blur')
    private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    private _focused: boolean = false;

    /**
     * 获取文本框是否有焦点
     *
     * $demo = input/focus
     */
    public get focused(): boolean {
        return this._focused;
    }

    /**
     * 在单击了清除文本按钮时，是否让文本失去焦点，默认为失去焦点。
     * 一般来说，是否失去焦点关系不大，但是在一些特定场合，却有很大关系。`JigsawTable`的默认单元格编辑渲染就是`JigsawInput`组件，
     * 按照`JigsawTable`的交互逻辑，单元格编辑器一旦失去焦点，就必须退回到单元格显示渲染器。
     * 在这个情况下，用户单击了清除文本按钮时就不能让输入框失去焦点。参考[这个demo]($demo=table/update-column-define)的职位列
     *
     * $demo = table/update-column-define
     */
    @Input()
    public blurOnClear: boolean = true;

    /**
     * @internal
     */
    public _$handleBlur(event: FocusEvent) {
        this._focused = false;
        if (this.blurOnClear) {
            this._blurEmitter.emit(event);
        } else {
            this.callLater(() => {
                if (!this._focused) {
                    this._blurEmitter.emit(event);
                }
            }, 150);
        }
        this._closeListPopup();
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
        this.value = item;
        this.selectEvent.emit(item);
    }

    private _propertyListPopupInfo: PopupInfo;

    private _showDropdownList(event) {
        const hostElement = this._elementRef.nativeElement;
        if (this._propertyListPopupInfo) {
            this._closeListPopup();
            return;
        }

        const popupOptions: PopupOptions = {
            modal: false,
            pos: hostElement,
            posOffset: {top: hostElement.offsetHeight},
            size: {width: hostElement.offsetWidth},
            posReviser: (pos: PopupPositionValue, popupElement: HTMLElement): PopupPositionValue => {
                return this._popupService.positionReviser(pos, popupElement, {
                    offsetHeight: hostElement.offsetHeight,
                    direction: 'v'
                });
            }
        };
        this._propertyListPopupInfo = this._popupService.popup(this._dropdownTemp, popupOptions);
        this._removeWindowListener();
        this._removeWindowMouseDownListener = this._render2.listen(document, 'mousedown', this._onMouseDown.bind(this));
    }

    private _onMouseDown() {
        const element = this._elementRef.nativeElement;
        if (!element.contains(document.activeElement)) {
            this._closeListPopup();
        }
    }

    private _removeWindowListener() {
        if (this._removeWindowMouseDownListener) {
            this._removeWindowMouseDownListener();
        }
    }

    private _closeListPopup() {
        if (this._propertyListPopupInfo) {
            this._propertyListPopupInfo.dispose();
            this._propertyListPopupInfo = null;
        }
        this._removeWindowListener();
    }

    public ngOnDestroy() {
        super.ngOnDestroy();
        this._closeListPopup();
    }
}

@NgModule({
    imports: [CommonModule, FormsModule, JigsawInputModule, PerfectScrollbarModule],
    declarations: [JigsawAutoCompleteInput],
    exports: [JigsawAutoCompleteInput],
})
export class JigsawAutoCompleteInputModule {

}
