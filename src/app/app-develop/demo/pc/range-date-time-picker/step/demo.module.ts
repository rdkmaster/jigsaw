import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRangeDateTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {RangeDateTimeStepDemoComponent} from "./demo.component";

@NgModule({
    declarations: [RangeDateTimeStepDemoComponent],
    exports: [RangeDateTimeStepDemoComponent],
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawRangeDateTimePickerModule]
})
export class RangeDateTimeStepDemoModule{

}
