import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTimeModule, JigsawTileSelectModule, JigsawComboSelectModule} from "jigsaw/public_api";
import {TimeWeekSelectComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [CommonModule, JigsawTimeModule, JigsawTileSelectModule, JigsawComboSelectModule, JigsawDemoDescriptionModule],
    declarations: [TimeWeekSelectComponent],
    exports: [TimeWeekSelectComponent]
})
export class TimeWeekSelectDemoModule {
}
