import {Component, NgModule, forwardRef, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule} from "./tile";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawGroupLiteComponent} from "jigsaw/component/list-and-tile/group-lite-common";

@Component({
    selector: 'jigsaw-tile-lite, j-tile-lite',
    template: `
        <j-tile [(selectedItems)]="selectedItems"
                [trackItemBy]="trackItemBy"
                [multipleSelect]="multipleSelect"
                (selectedItemsChange)="_$handleSelectChange($event)">
            <j-tile-option *ngFor="let item of data; trackBy: _$trackByFn" [value]="item"
                           [width]="optionWidth" [height]="optionHeight" [disabled]="item?.disabled">
                {{item && item[labelField] ? item[labelField] : item}}
            </j-tile-option>
        </j-tile>`,
    host: {
        '[class.jigsaw-tile-lite]': 'true',
        '[style.width]': 'width'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawTileLite), multi: true},
    ]
})
export class JigsawTileLite extends AbstractJigsawGroupLiteComponent {
    @Input()
    public optionWidth: number | string;

    @Input()
    public optionHeight: number | string;
}

@NgModule({
    imports: [CommonModule, JigsawTileSelectModule],
    declarations: [JigsawTileLite],
    exports: [JigsawTileLite]
})
export class JigsawTileLiteModule {

}
