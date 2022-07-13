import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRangeDateTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeDateTimeBasicDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [RangeDateTimeBasicDemoComponent],
    exports: [RangeDateTimeBasicDemoComponent],
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawRangeDateTimePickerModule, DemoTemplateModule]
})
export class RangeDateTimeBasicDemoModule{

}
