import {Component, NgModule, forwardRef, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileTileSelectModule} from "./tile";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawMobileGroupLiteComponent} from "./group-lite-common";

@Component({
    selector: 'jigsaw-mobile-button-bar, jm-button-bar',
    template: `
        <jm-tile [(selectedItems)]="selectedItems" [trackItemBy]="trackItemBy"
                [multipleSelect]="multipleSelect" [height]="height" [valid]="valid"
                (selectedItemsChange)="_$handleSelectChange($event)">
            <jm-tile-option #tileOpt *ngFor="let item of data; trackBy: _$trackByFn" [value]="item" [ngClass]="{'jigsaw-mobile-button-bar-one-option': data && data.length == 1}"
                           [width]="optionWidth" [height]="height" [disabled]="item?.disabled">
                {{item && item[labelField] ? item[labelField] : item}}
            </jm-tile-option>
        </jm-tile>`,
    host: {
        '[class.jigsaw-button-bar]': 'true',
        '[class.jigsaw-button-bar-primary]': "colorType === 'primary'",
        '[class.jigsaw-button-bar-warning]': "colorType === 'warning'",
        '[class.jigsaw-button-bar-error]': "colorType === 'error' || colorType === 'danger'",
        '[style.height]': 'height',
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawMobileButtonBar), multi: true},
    ]
})
export class JigsawMobileButtonBar extends AbstractJigsawMobileGroupLiteComponent {
    @Input()
    public optionWidth: number | string;

    @Input()
    public colorType: 'default' | 'primary' | 'warning' | 'error' | 'danger' = 'primary';
}

@NgModule({
    imports: [CommonModule, JigsawMobileTileSelectModule],
    declarations: [JigsawMobileButtonBar],
    exports: [JigsawMobileButtonBar]
})
export class JigsawMobileButtonBarModule {

}
