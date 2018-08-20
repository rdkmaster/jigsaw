import {ChangeDetectorRef, Component, ContentChildren, forwardRef, Input, NgModule, QueryList,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms'
import {JigsawInputModule} from '../input/input';
import {AbstractJigsawGroupComponent, AbstractJigsawOptionComponent} from "./group-common";

@Component({
    selector: 'jigsaw-tile, j-tile',
    template: '<ng-content></ng-content>',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[class.jigsaw-tile]': 'true',
        '[class.jigsaw-tile-tab-style]': 'tabStyle'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawTile), multi: true},
    ]
})
export class JigsawTile extends AbstractJigsawGroupComponent {
    // 默认多选
    public multipleSelect: boolean = true;

    private _tabStyle: boolean;

    @Input()
    public get tabStyle(): boolean {
        return this._tabStyle
    };

    public set tabStyle(value: boolean) {
        this._tabStyle = value;
        if(value) {
            this.multipleSelect = false;
        }
    }

    @ContentChildren(forwardRef(() => JigsawTileOption))
    protected _items: QueryList<JigsawTileOption>;

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
        '[class.jigsaw-tile-option-background]': 'backgroundStyle',
        '(click)': '_$handleClick()'
    }
})
export class JigsawTileOption extends AbstractJigsawOptionComponent {

    constructor(public changeDetector: ChangeDetectorRef) {
        super();
    }

    @Input()
    public backgroundStyle: boolean;

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




