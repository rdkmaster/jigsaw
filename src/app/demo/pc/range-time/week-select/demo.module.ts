import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule, JigsawRangeTimeModule, JigsawComboSelectModule} from "jigsaw/public_api";
import {RangeTimeWeekSelectComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [CommonModule, JigsawRangeTimeModule, JigsawTileSelectModule, JigsawComboSelectModule, JigsawDemoDescriptionModule],
    declarations: [RangeTimeWeekSelectComponent],
    exports: [RangeTimeWeekSelectComponent]
})
export class RangeTimeWeekSelectDemoModule {
}
