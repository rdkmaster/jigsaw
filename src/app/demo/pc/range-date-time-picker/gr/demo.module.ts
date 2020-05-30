import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonBarModule} from "jigsaw/pc-components/list-and-tile/button-bar";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeDateTimeGrComponent} from "./demo.component";
import {JigsawRangeDateTimePickerModule} from "jigsaw/pc-components/date-and-time/range-date-time-picker";

@NgModule({
    declarations: [RangeDateTimeGrComponent],
    exports: [RangeDateTimeGrComponent],
    imports: [ CommonModule, JigsawDemoDescriptionModule, JigsawButtonBarModule, JigsawRangeDateTimePickerModule]
})
export class RangeDateTimeGrModule {

}
