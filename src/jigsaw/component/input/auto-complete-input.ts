import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Input,
    NgModule,
    OnDestroy,
    OnInit,
    Renderer2,
    TemplateRef,
    ViewChild,
    Output,
    EventEmitter
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {JigsawInput, JigsawInputModule} from "./input";
import {PopupInfo, PopupOptions, PopupPositionValue, PopupService} from "../../service/popup.service";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {CommonUtils} from "../../core/utils/common-utils";

export class DropDownValue {
    constructor(data = null) {
        if (data) {
            for (let attrItem in data) {
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
export class JigsawAutoCompleteInput extends JigsawInput implements OnDestroy, OnInit {
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

    @Input()
    public valid: boolean = true;

    @ViewChild('dropdownTemp')
    private _dropdownTemp: TemplateRef<any>;

    @ViewChild('input')
    private _input: JigsawInput;

    /**
     * 下拉提示内容被选中时，会发出`select`事件，此事件可用于区分用户手工输入的还是选择的
     *
     * $demo = auto-complete-input/select-event
     */
    @Output('select')
    public selectEvent = new EventEmitter<string>();

    constructor(protected _render2: Renderer2,
                protected _elementRef: ElementRef,
                protected _changeDetectorRef: ChangeDetectorRef,
                private _popupService: PopupService) {
        super(_render2, _elementRef, _changeDetectorRef);
    }

    ngOnInit() {
        super.ngOnInit();
        this._input.valueChange.debounceTime(300).subscribe(() => {
            this.getfilteredDropDownData();
        });
    }

    getfilteredDropDownData() {
        let filterKey = this._input.value;
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

    private _filter(category: DropDownValue, key) {
        let items = category.items.filter(item => {
            return item.toLowerCase().includes(key.toLowerCase());
        });
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
        this.getfilteredDropDownData();
        this._showDropdownList(event);
    }

    /**
     * @internal
     */
    public _$handleBlur(event: FocusEvent) {
        super._$handleBlur(event);
        this._closeListPopup();
    }

    /**
     * @internal
     */
    public _$add(item) {
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
