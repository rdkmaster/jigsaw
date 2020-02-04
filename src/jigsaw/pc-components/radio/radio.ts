import {
    ChangeDetectorRef,
    Component, ContentChildren,
    EventEmitter,
    forwardRef,
    Input,
    NgModule,
    Output,
    QueryList,
    ChangeDetectionStrategy,
    ElementRef,
    Renderer2,
    ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AbstractJigsawGroupComponent, AbstractJigsawOptionComponent} from "../list-and-tile/group-common";
import {ArrayCollection} from "../../common/core/data/array-collection";
import {CommonUtils} from "../../common/core/utils/common-utils";

@Component({
    selector: 'jigsaw-radios, j-radios',
    template: '<ng-content></ng-content>',
    host: {
        '[class.jigsaw-radios]': 'true',
        '[class.jigsaw-radios-error]': '!valid'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawRadioGroup), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawRadioGroup extends AbstractJigsawGroupComponent {

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

    @ContentChildren(forwardRef(() => JigsawRadioOption))
    protected _items: QueryList<JigsawRadioOption>;

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
        this.changeDetectorRef.markForCheck();
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
    constructor(public changeDetector: ChangeDetectorRef, private _renderer: Renderer2) {
        super();
    }

    @ViewChild('inner') private _inner: ElementRef;

    private _selected: boolean = false;
    @Input()
    public get selected(): boolean {
        return this._selected;
    }

    public set selected(value: boolean) {
        this._selected = value;
        this._setStyle();
    }

    private _setStyle() {
        if (this._inner) {
            if (this.selected) {
                this._renderer.addClass(this._inner.nativeElement, 'jigsaw-radio-option-checked');
            } else {
                this._renderer.removeClass(this._inner.nativeElement, 'jigsaw-radio-option-checked');
            }
        }
    }

    /**
     * 点击组件触发
     * @internal
     */
    public

    _$handleClick()
        :
        void {
        if (!
            this.disabled
        ) {
            this.change.emit(this);
        }
        this.changeDetector.markForCheck();
    }

}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [JigsawRadioGroup, JigsawRadioOption],
    exports: [JigsawRadioGroup, JigsawRadioOption]
})
export class JigsawRadioModule {

}
