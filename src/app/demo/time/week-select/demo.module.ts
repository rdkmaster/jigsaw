import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTimeModule} from "jigsaw/component/time/index";
import {JigsawTileSelectModule} from "jigsaw/component/list-and-tile/tile";
import {TimeWeekSelectComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select";

@NgModule({
    imports: [CommonModule, JigsawTimeModule, JigsawTileSelectModule, JigsawComboSelectModule, JigsawDemoDescriptionModule],
    declarations: [TimeWeekSelectComponent],
    exports: [TimeWeekSelectComponent]
})
export class TimeWeekSelectDemoModule {
}
