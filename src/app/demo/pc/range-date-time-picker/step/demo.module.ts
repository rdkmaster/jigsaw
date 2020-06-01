import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeDateTimeStepDemoComponent} from "./demo.component";
import {JigsawRangeDateTimePickerModule} from "jigsaw/pc-components/date-and-time/range-date-time-picker";

@NgModule({
    declarations: [RangeDateTimeStepDemoComponent],
    exports: [RangeDateTimeStepDemoComponent],
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawRangeDateTimePickerModule]
})
export class RangeDateTimeStepDemoModule{

}
