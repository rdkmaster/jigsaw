import {Component, NgModule, forwardRef, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule} from "./tile";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawGroupLiteComponent} from "./group-lite-common";

@Component({
    selector: 'jigsaw-button-bar, j-button-bar',
    template: `
        <j-tile [(selectedItems)]="selectedItems"
                [trackItemBy]="trackItemBy"
                [multipleSelect]="false"
                (selectedItemsChange)="_$handleSelectChange($event)">
            <j-tile-option *ngFor="let item of data; trackBy: _$trackByFn" [value]="item"
                           [width]="optionWidth" [height]="optionHeight" [disabled]="item?.disabled"
                           [class.jigsaw-tile-option-background]="backgroundStyle">
                {{item && item[labelField] ? item[labelField] : item}}
            </j-tile-option>
        </j-tile>`,
    host: {
        '[class.jigsaw-button-bar]': 'true',
        '[style.width]': 'width'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawButtonBar), multi: true},
    ]
})
export class JigsawButtonBar extends AbstractJigsawGroupLiteComponent {
    @Input()
    public optionWidth: number | string;

    @Input()
    public optionHeight: number | string;

    @Input()
    public backgroundStyle: boolean;
}

@NgModule({
    imports: [CommonModule, JigsawTileSelectModule],
    declarations: [JigsawButtonBar],
    exports: [JigsawButtonBar]
})
export class JigsawButtonBarModule {

}
