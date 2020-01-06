import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTimeModule} from "jigsaw/pc-components/time/index";
import {JigsawTileSelectModule} from "jigsaw/pc-components/list-and-tile/tile";
import {TimeWeekDayStartComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select";

@NgModule({
    imports: [CommonModule, JigsawTimeModule, JigsawTileSelectModule, JigsawComboSelectModule, JigsawDemoDescriptionModule],
    declarations: [TimeWeekDayStartComponent],
    exports: [TimeWeekDayStartComponent]
})
export class TimeWeekDayStartDemoModule {
}
