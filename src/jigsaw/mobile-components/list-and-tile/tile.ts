import {ChangeDetectorRef, Component, ContentChildren, forwardRef, Input, NgModule, QueryList,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms'
import {JigsawMobileInputModule} from '../input/input';
import {AbstractJigsawMobileGroupComponent, AbstractJigsawMobileOptionComponent} from "./group-common";

@Component({
    selector: 'jigsaw-mobile-tile, jm-tile',
    template: '<ng-content></ng-content>',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[class.jigsaw-tile]': 'true',
        '[class.jigsaw-tile-error]': '!valid'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawMobileTile), multi: true},
    ]
})
export class JigsawMobileTile extends AbstractJigsawMobileGroupComponent {
    // 默认多选
    public multipleSelect: boolean = true;

    @ContentChildren(forwardRef(() => JigsawMobileTileOption))
    protected _items: QueryList<JigsawMobileTileOption>;

}

@Component({
    selector: 'jigsaw-mobile-tile-option,jm-tile-option',
    template: '<ng-content></ng-content>',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': 'height',
        '[class.jigsaw-tile-option]': 'true',
        '[class.jigsaw-tile-option-active]': 'selected',
        '[class.jigsaw-tile-option-disabled]': 'disabled',
        '(click)': '_$handleClick()'
    }
})
export class JigsawMobileTileOption extends AbstractJigsawMobileOptionComponent {

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
    imports: [CommonModule, FormsModule, JigsawMobileInputModule],
    declarations: [JigsawMobileTile, JigsawMobileTileOption],
    exports: [JigsawMobileTile, JigsawMobileTileOption]
})
export class JigsawMobileTileSelectModule {

}




