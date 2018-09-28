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
    ViewChild
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
    public _$data: string[] | DropDownValue[];
    public _bakData: any[];
    public _$maxDropDownHeight: string = '300px';

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

    constructor(_render2: Renderer2,
                _elementRef: ElementRef,
                _changeDetectorRef: ChangeDetectorRef,
                private _popupService: PopupService) {
        super(_render2, _elementRef, _changeDetectorRef);
    }

    ngOnInit() {
        super.ngOnInit();
        this._input.valueChange.debounceTime(300).subscribe(() => {
            let filterKey = this._input.value;
            filterKey = filterKey ? filterKey.trim() : '';
            // 解决对象数组改变时，抛出 ExpressionChangedAfterItHasBeenCheckedError 的问题
            this.callLater(() => {
                let data: any = [];
                data = this._bakData.reduce((arr, category) => {
                    let result = this._filter(category, filterKey);
                    if (result) {
                        arr.push(result);
                    }
                    return arr;
                }, data);
                this._$data = data;
            });
        });
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

    public _$handleFocus(event: FocusEvent) {
        super._$handleFocus(event);
        this._showDropdownList(event);
    }

    public _$handleBlur(event: FocusEvent) {
        super._$handleBlur(event);
        this._$closeListPopup();
    }

    private _isPropertyListPopped: boolean;
    private _propertyListPopup: PopupInfo;

    private _showDropdownList(event) {
        if (this._isPropertyListPopped) {
            this._$closeListPopup();
        } else {
            const popupOptions: PopupOptions = {
                modal: false,
                pos: event.currentTarget,
                posOffset: {top: event.target.offsetHeight},
                size: {width: event.target.offsetWidth},
                posReviser: (pos: PopupPositionValue, popupElement: HTMLElement): PopupPositionValue => {
                    return this._popupService.verticalPositionReviser(pos, popupElement, {
                        offsetHeight: event.target.offsetHeight
                    });
                }
            };
            this._propertyListPopup = this._popupService.popup(this._dropdownTemp, popupOptions);
            this._isPropertyListPopped = true;
        }
    }

    private _$closeListPopup() {
        if (this._isPropertyListPopped) {
            this._propertyListPopup.dispose();
            this._propertyListPopup = null;
            this._isPropertyListPopped = false;
        }
    }

    public _$add(item) {
        this.value = item;
    }

    public ngOnDestroy() {
        super.ngOnDestroy();
        this._$closeListPopup();
    }
}

@NgModule({
    imports: [CommonModule, FormsModule, JigsawInputModule, PerfectScrollbarModule],
    declarations: [JigsawAutoCompleteInput],
    exports: [JigsawAutoCompleteInput],
})
export class JigsawAutoCompleteInputModule {

}
