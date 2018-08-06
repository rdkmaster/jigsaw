import {ChangeDetectorRef, Component, ElementRef, forwardRef, Input, NgModule, Renderer2, TemplateRef, ViewChild} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {JigsawInput, JigsawInputModule} from "./input";
import {PopupInfo, PopupOptions, PopupService} from "../../service/popup.service";
import {ArrayCollection} from "../../core/data/array-collection";
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
 * $demo = autocomplete-input/full
 */
@Component({
    selector: 'jigsaw-autocomplete-input, j-autocomplete-input',
    templateUrl: 'autocomplete-input.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[class.jigsaw-autocomplete-input]': 'true'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawAutoCompleteInput), multi: true},
    ]
})
export class JigsawAutoCompleteInput extends JigsawInput {
    public _$data: string[] | ArrayCollection<DropDownValue>;
    public _bakData: ArrayCollection<DropDownValue>;
    public _$dropDownMaxHeight: string = '300px';

    @Input()
    public showSearchIcon: boolean = false;

    @Input()
    public set dropDownMaxHeight(value: string) {
        if (value == this._$dropDownMaxHeight || !value) {
            return;
        }
        this._$dropDownMaxHeight = CommonUtils.getCssValue(value);
    }

    @Input()
    public get data(): string[] | ArrayCollection<DropDownValue> {
        return this._$data;
    }

    public set data(value: string[] | ArrayCollection<DropDownValue>) {
        if (value == this._$data || !value || value.length == 0) {
            return;
        }

        if (typeof value[0] == 'string') {
            this._$data = new ArrayCollection([new DropDownValue({
                category: '',
                items: value
            })]);
        } else {
            this._$data = value;
        }
        this._bakData = new ArrayCollection(this._$data);
    }

    @ViewChild('dropdownTemp')
    dropdownTemp: TemplateRef<any>;

    constructor(_render2: Renderer2,
                _elementRef: ElementRef,
                _changeDetectorRef: ChangeDetectorRef,
                private _popupService: PopupService) {
        super(_render2, _elementRef, _changeDetectorRef);
    }


    public _$handleSearching(filterKey?: string) {
        filterKey = filterKey ? filterKey.trim() : '';
        setTimeout(() => { // 解决对象数组改变时，抛出 ExpressionChangedAfterItHasBeenCheckedError 的问题
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
        window.setTimeout(() => {
            this._$closeListPopup();
        }, 50)
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
                posOffset: {top: 35},
                size: {width: event.target.offsetWidth}
            };
            this._propertyListPopup = this._popupService.popup(this.dropdownTemp, popupOptions);
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
}

@NgModule({
    imports: [CommonModule, FormsModule, JigsawInputModule, PerfectScrollbarModule],
    declarations: [JigsawAutoCompleteInput],
    exports: [JigsawAutoCompleteInput],
})
export class JigsawAutoCompleteInputModule {

}
