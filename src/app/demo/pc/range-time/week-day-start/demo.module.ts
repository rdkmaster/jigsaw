import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule} from "jigsaw/pc-components/list-and-tile/tile";
import {RangeTimeWeekDayStartComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawRangeTimeModule} from "../../../../../jigsaw/pc-components/range-time";
import {JigsawComboSelectModule} from "../../../../../jigsaw/pc-components/combo-select";

@NgModule({
    imports: [CommonModule, JigsawRangeTimeModule, JigsawTileSelectModule, JigsawComboSelectModule, JigsawDemoDescriptionModule],
    declarations: [RangeTimeWeekDayStartComponent],
    exports: [RangeTimeWeekDayStartComponent]
})
export class RangeTimeWeekDayStartDemoModule {
}
