import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    forwardRef,
    Injector,
    Input,
    NgModule,
    Output,
    QueryList,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AbstractJigsawGroupComponent, AbstractJigsawOptionComponent} from "../list-and-tile/group-common";
import {ArrayCollection} from "../../common/core/data/array-collection";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {WingsTheme} from "../../common/common";

export type RadiosGroupValue = {
    disabled?: boolean, label?: string,
    [prop: string]: any
}

@WingsTheme('radios.scss')
@Component({
    selector: 'jigsaw-radios, j-radios',
    template: '<ng-content></ng-content>',
    host: {
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-radios-host]': 'true',
        '[class.jigsaw-radios-error]': '!valid'
    },
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawRadioGroup), multi: true },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawRadioGroup extends AbstractJigsawGroupComponent {

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get value(): string | RadiosGroupValue {
        return this.selectedItems && this.selectedItems.length != 0 ? this.selectedItems[0] : null;
    }

    public set value(newValue: string | RadiosGroupValue) {
        this.writeValue(newValue);
    }

    @Output()
    public valueChange: EventEmitter<any> = new EventEmitter<any>();

    // 默认单选
    public multipleSelect: boolean = false;

    @ContentChildren(forwardRef(() => JigsawRadioOption))
    protected _items: QueryList<JigsawRadioOption>;

    /**
     * 选中的条目
     * @internal
     * @NoMarkForCheckRequired
     */
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
    public writeValue(newValue: string | RadiosGroupValue): void {
        if (newValue && this.value != newValue) {
            this.selectedItems = [newValue];
        } else if (CommonUtils.isUndefined(newValue)) {
            this.selectedItems = [];
        }
    }
}

@Component({
    selector: 'jigsaw-radio-option, j-radio-option',
    templateUrl: 'radio-option.html',
    host: {
        '(click)': '_$handleClick()',
        '[class.jigsaw-radio-option]': 'true',
        '[class.jigsaw-radio-option-disabled]': 'disabled'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawRadioOption extends AbstractJigsawOptionComponent {
    constructor(// @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
        super(_injector);
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
    declarations: [JigsawRadioGroup, JigsawRadioOption],
    exports: [JigsawRadioGroup, JigsawRadioOption]
})
export class JigsawRadioModule {
}
