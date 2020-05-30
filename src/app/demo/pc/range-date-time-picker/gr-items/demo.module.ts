import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeDateTimeGrItemsComponent} from "./demo.component";
import {JigsawRangeDateTimePickerModule} from "jigsaw/pc-components/date-and-time/range-date-time-picker";

@NgModule({
    declarations: [RangeDateTimeGrItemsComponent],
    exports: [RangeDateTimeGrItemsComponent],
    imports: [JigsawDemoDescriptionModule, JigsawRangeDateTimePickerModule, CommonModule]
})
export class RangeDateTimeGrItemsModule {

}
