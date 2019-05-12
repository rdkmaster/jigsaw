import {
    ChangeDetectorRef,
    Component, ContentChildren,
    EventEmitter,
    forwardRef,
    Input,
    NgModule,
    Output,
    QueryList,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AbstractJigsawMobileGroupComponent, AbstractJigsawMobileOptionComponent} from "../list-and-tile/group-common";
import {ArrayCollection} from "../../common/core/data/array-collection";
import {CommonUtils} from "../../common/core/utils/common-utils";

@Component({
    selector: 'jigsaw-mobile-radios, jm-radios',
    template: '<ng-content></ng-content>',
    host: {
        '[class.jigsaw-radios]': 'true',
        '[class.jigsaw-radios-error]': '!valid'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawMobileRadioGroup), multi: true},
    ]
})
export class JigsawMobileRadioGroup extends AbstractJigsawMobileGroupComponent {

    @Input()
    public get value(): any {
        return this.selectedItems && this.selectedItems.length != 0 ? this.selectedItems[0] : null;
    }

    public set value(newValue: any) {
        this.writeValue(newValue);
    }

    @Output() public valueChange: EventEmitter<any> = new EventEmitter<any>();

    // 默认多选
    public multipleSelect: boolean = false;

    @ContentChildren(forwardRef(() => JigsawMobileRadioOption))
    protected _items: QueryList<JigsawMobileRadioOption>;

    // 重写selectedItems
    @Input()
    public get selectedItems(): ArrayCollection<any> | any[] {
        return this._selectedItems;
    }

    public set selectedItems(newValue: ArrayCollection<any> | any[]) {
        this._setSelectedItems(newValue);
    }

    // 重写_updateSelectItems
    protected _updateSelectItemsForForm(itemValue, selected): void {
        this._updateSelectItems(itemValue, selected);
        this.valueChange.emit(this.selectedItems[0]);
        this._propagateChange(this.selectedItems[0]);
    }

    // 重写writeValue
    public writeValue(newValue: any): void {
        if (newValue && this.value != newValue) {
            this.selectedItems = [newValue];
        } else if (CommonUtils.isUndefined(newValue)) {
            this.selectedItems = [];
        }
    }
}

@Component({
    selector: 'jigsaw-mobile-radio-option, jm-radio-option',
    templateUrl: 'radio-option.html',
    host: {
        '(click)': '_$handleClick()',
        '[class.jigsaw-radio-option]': 'true',
        '[class.jigsaw-radio-option-disabled]': 'disabled'
    }
})
export class JigsawMobileRadioOption extends AbstractJigsawMobileOptionComponent {
    constructor(public changeDetector: ChangeDetectorRef) {
        super();
    }

    /**
     * 点击组件触发
     * @internal
     */
    public _$handleClick(): void {
        if (!this.disabled) {
            this.change.emit(this);
        }
    }

}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [JigsawMobileRadioGroup, JigsawMobileRadioOption],
    exports: [JigsawMobileRadioGroup, JigsawMobileRadioOption]
})
export class JigsawMobileRadioModule {

}
