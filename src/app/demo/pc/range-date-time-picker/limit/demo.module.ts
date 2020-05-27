import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeDateTimeLimitComponent} from "./demo.component";
import {JigsawRangeDateTimePickerModule} from "jigsaw/pc-components/date-and-time/range-date-time-picker";
import {JigsawRadioModule} from "jigsaw/pc-components/radio/radio";

@NgModule({
    declarations: [RangeDateTimeLimitComponent],
    exports: [RangeDateTimeLimitComponent],
    imports: [JigsawRadioModule, CommonModule, JigsawDemoDescriptionModule, JigsawRangeDateTimePickerModule]
})
export class RangeDateTimeLimitModule {

}
