import {Component, NgModule, forwardRef, Input, ChangeDetectionStrategy} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule} from "./tile";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawGroupLiteComponent} from "./group-lite-common";

@Component({
    selector: 'jigsaw-button-bar, j-button-bar',
    template: `
        <j-tile [(selectedItems)]="selectedItems" [trackItemBy]="trackItemBy"
                [multipleSelect]="multipleSelect" [height]="height" [valid]="valid"
                (selectedItemsChange)="_$handleSelectChange($event)">
            <j-tile-option #tileOpt *ngFor="let item of data; trackBy: _$trackByFn" [value]="item" [ngClass]="{'jigsaw-button-bar-one-option': data && data.length == 1}"
                           [width]="optionWidth" [height]="height" [disabled]="item?.disabled"
                           title="{{item && item[labelField] ? item[labelField] : item}}">
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
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
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
