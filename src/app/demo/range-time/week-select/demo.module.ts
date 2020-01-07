import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule} from "jigsaw/component/list-and-tile/tile";
import {RangeTimeWeekSelectComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select";

@NgModule({
    imports: [CommonModule, JigsawRangeTimeModule, JigsawTileSelectModule, JigsawComboSelectModule, JigsawDemoDescriptionModule],
    declarations: [RangeTimeWeekSelectComponent],
    exports: [RangeTimeWeekSelectComponent]
})
export class RangeTimeWeekSelectDemoModule {
}
