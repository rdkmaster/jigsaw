import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    forwardRef,
    Input,
    NgModule,
    QueryList,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms'
import {JigsawInputModule} from '../input/input';
import {AbstractJigsawGroupComponent, AbstractJigsawOptionComponent} from "./group-common";
import {ArrayCollection} from "../../common/core/data/array-collection";

@Component({
    selector: 'jigsaw-tile, j-tile',
    template: '<ng-content></ng-content>',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[class.jigsaw-tile]': 'true',
        '[class.jigsaw-tile-error]': '!valid',
        '[class.jigsaw-tile-without-border]': '!showBorder'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawTile), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTile extends AbstractJigsawGroupComponent {
    // 默认多选
    public multipleSelect: boolean = true;

    @ContentChildren(forwardRef(() => JigsawTileOption))
    protected _items: QueryList<JigsawTileOption>;

    @Input()
    public showBorder: boolean = true;

    @Input()
    public get selectedItems(): ArrayCollection<any> | any[] {
        return this._selectedItems;
    }

    public set selectedItems(newValue: ArrayCollection<any> | any[]) {
        this.writeValue(newValue);
        if (this._selectedItems === newValue) {
            return;
        }
        this._propagateChange(newValue);
        this._cdr.markForCheck();
    }

    constructor(private _cdr: ChangeDetectorRef) {
        super();
    }

}

@Component({
    selector: 'jigsaw-tile-option,j-tile-option',
    template: '<ng-content></ng-content>',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': 'height',
        '[class.jigsaw-tile-option]': 'true',
        '[class.jigsaw-tile-option-active]': 'selected',
        '[class.jigsaw-tile-option-disabled]': 'disabled',
        '(click)': '_$handleClick()'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTileOption extends AbstractJigsawOptionComponent {

    constructor(public cdr: ChangeDetectorRef) {
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
    imports: [CommonModule, FormsModule, JigsawInputModule],
    declarations: [JigsawTile, JigsawTileOption],
    exports: [JigsawTile, JigsawTileOption]
})
export class JigsawTileSelectModule {

}




