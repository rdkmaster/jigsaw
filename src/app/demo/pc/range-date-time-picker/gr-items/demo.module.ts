import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRangeDateTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeDateTimeGrItemsComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [RangeDateTimeGrItemsComponent],
    exports: [RangeDateTimeGrItemsComponent],
    imports: [JigsawDemoDescriptionModule, JigsawRangeDateTimePickerModule, CommonModule, DemoTemplateModule]
})
export class RangeDateTimeGrItemsModule {

}
