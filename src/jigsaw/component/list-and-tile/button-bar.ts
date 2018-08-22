import {Component, NgModule, forwardRef, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule} from "./tile";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawGroupLiteComponent} from "./group-lite-common";

@Component({
    selector: 'jigsaw-button-bar, j-button-bar',
    template: `
        <j-tile [(selectedItems)]="selectedItems" [trackItemBy]="trackItemBy"
                [multipleSelect]="false" [height]="height"
                (selectedItemsChange)="_$handleSelectChange($event)">
            <j-tile-option #tileOpt *ngFor="let item of data; trackBy: _$trackByFn" [value]="item"
                           [width]="optionWidth" [height]="height" [disabled]="item?.disabled">
                {{item && item[labelField] ? item[labelField] : item}}
            </j-tile-option>
        </j-tile>`,
    host: {
        '[class.jigsaw-button-bar]': 'true',
        '[class.jigsaw-button-bar-primary]': "colorType === 'primary'",
        '[class.jigsaw-button-bar-warning]': "colorType === 'warning'",
        '[class.jigsaw-button-bar-error]': "colorType === 'error' || colorType === 'danger'",
        '[style.height]': 'height',
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawButtonBar), multi: true},
    ]
})
export class JigsawButtonBar extends AbstractJigsawGroupLiteComponent {
    @Input()
    public optionWidth: number | string;

    @Input()
    public colorType: 'default' | 'primary' | 'warning' | 'error' | 'danger' = 'primary';
}

@NgModule({
    imports: [CommonModule, JigsawTileSelectModule],
    declarations: [JigsawButtonBar],
    exports: [JigsawButtonBar]
})
export class JigsawButtonBarModule {

}
