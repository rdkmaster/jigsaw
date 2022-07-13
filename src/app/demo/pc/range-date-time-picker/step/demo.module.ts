import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRangeDateTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeDateTimeStepDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [RangeDateTimeStepDemoComponent],
    exports: [RangeDateTimeStepDemoComponent],
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawRangeDateTimePickerModule, DemoTemplateModule]
})
export class RangeDateTimeStepDemoModule{

}
