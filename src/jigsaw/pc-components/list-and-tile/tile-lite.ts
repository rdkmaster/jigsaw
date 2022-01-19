import {Component, NgModule, forwardRef, Input, ChangeDetectionStrategy} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {JigsawTileSelectModule} from "./tile";
import {AbstractJigsawGroupLiteComponent} from "./group-lite-common";
import {WingsTheme} from "../../common/common";

@WingsTheme('jigsaw-tile-lite')
@Component({
    selector: 'jigsaw-tile-lite, j-tile-lite',
    template: `
        <j-tile [theme]="theme" [(selectedItems)]="selectedItems"
                [trackItemBy]="trackItemBy" [valid]="valid"
                [multipleSelect]="multipleSelect"
                (selectedItemsChange)="_$handleSelectChange($event)"
                [showBorder]="showBorder">
            <j-tile-option *ngFor="let item of data; trackBy: _$trackByFn" [value]="item"
                           [width]="optionWidth" [height]="optionHeight" [disabled]="item?.disabled"
                           title="{{item && item[labelField] ? item[labelField] : item}}">
                {{item && item[labelField] ? item[labelField] : item}}
            </j-tile-option>
        </j-tile>`,
    host: {
        '[style.width]': 'width',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-tile-lite-host]': 'true'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawTileLite), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTileLite extends AbstractJigsawGroupLiteComponent {
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public optionWidth: number | string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public optionHeight: number | string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public showBorder: boolean = true;
}

@NgModule({
    imports: [CommonModule, JigsawTileSelectModule],
    declarations: [JigsawTileLite],
    exports: [JigsawTileLite]
})
export class JigsawTileLiteModule {

}
