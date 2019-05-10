import {Component, NgModule, forwardRef, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileTileSelectModule} from "./tile";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawMobileGroupLiteComponent} from "./group-lite-common";

@Component({
    selector: 'jigsaw-mobile-tile-lite, jm-tile-lite',
    template: `
        <jm-tile [(selectedItems)]="selectedItems"
                [trackItemBy]="trackItemBy" [valid]="valid"
                [multipleSelect]="multipleSelect"
                (selectedItemsChange)="_$handleSelectChange($event)">
            <jm-tile-option *ngFor="let item of data; trackBy: _$trackByFn" [value]="item"
                           [width]="optionWidth" [height]="optionHeight" [disabled]="item?.disabled">
                {{item && item[labelField] ? item[labelField] : item}}
            </jm-tile-option>
        </jm-tile>`,
    host: {
        '[class.jigsaw-tile-lite]': 'true',
        '[style.width]': 'width'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawMobileTileLite), multi: true},
    ]
})
export class JigsawMobileTileLite extends AbstractJigsawMobileGroupLiteComponent {
    @Input()
    public optionWidth: number | string;

    @Input()
    public optionHeight: number | string;
}

@NgModule({
    imports: [CommonModule, JigsawMobileTileSelectModule],
    declarations: [JigsawMobileTileLite],
    exports: [JigsawMobileTileLite]
})
export class JigsawMobileTileLiteModule {

}
