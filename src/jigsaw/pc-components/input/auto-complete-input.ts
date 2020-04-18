import 'rxjs/add/operator/debounceTime';
import {Subscription} from "rxjs/Subscription";
import {
    AfterViewInit,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    NgModule,
    OnDestroy,
    Output,
    TemplateRef,
    ViewChild
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawInput, JigsawInputModule} from "./input";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {JigsawFloat, JigsawFloatModule} from "../../common/directive/float/index";

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
export class JigsawAutoCompleteInput extends JigsawInput implements OnDestroy, AfterViewInit {
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
    public _$maxDropDownHeight: string = '300px';

    public _$propertyListOpen: boolean = false;

    @Input()
    public closeDropDownOnSelect: boolean = true;

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

    /**
     * 用于控制在输入框获得焦点后是否自动执行过滤
     *
     * $demo = auto-complete-input/with-group
     */
    @Input()
    public filterOnFocus: boolean = true;

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
        this._subscribeInputValueChange();
    }

    private _inputValueChangeSubscription: Subscription;

    private _subscribeInputValueChange(): void {
        if (this._inputValueChangeSubscription) {
        	return;
        }

        this._inputValueChangeSubscription = this._input.valueChange
            .debounceTime(300)
            .subscribe(() => {
                this._getFilteredDropDownData(true);
            });
    }

    private _unsubscribeInputValueChange(): void {
        if (!this._inputValueChangeSubscription) {
            return;
        }
        this._inputValueChangeSubscription.unsubscribe();
        this._inputValueChangeSubscription = null;
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

        this._$propertyListOpen = data.length > 0;
        if (this._$propertyListOpen) {
            this.callLater(() => {
                this._dropdownFloat.reposition();
            });
        }
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

        this._unsubscribeInputValueChange();
        this.value = item;

        this.selectEvent.emit(item);
    }

    public _$onKeyDown(event) {
        if (!this._inputValueChangeSubscription) {
            this._subscribeInputValueChange();
        }
        if (event.keyCode == 27) {
            this._$propertyListOpen = false;
        }
    }

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
        this._unsubscribeInputValueChange();
    }
}

@NgModule({
    imports: [CommonModule, FormsModule, JigsawInputModule, PerfectScrollbarModule, JigsawFloatModule],
    declarations: [JigsawAutoCompleteInput],
    exports: [JigsawAutoCompleteInput],
})
export class JigsawAutoCompleteInputModule {
}
