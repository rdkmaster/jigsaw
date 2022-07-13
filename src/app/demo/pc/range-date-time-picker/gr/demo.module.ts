import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonBarModule, JigsawRangeDateTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeDateTimeGrComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [RangeDateTimeGrComponent],
    exports: [RangeDateTimeGrComponent],
    imports: [ CommonModule, JigsawDemoDescriptionModule, JigsawButtonBarModule, JigsawRangeDateTimePickerModule, DemoTemplateModule]
})
export class RangeDateTimeGrModule {

}
