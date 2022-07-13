import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRangeDateTimePickerModule, JigsawRadioModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeDateTimeLimitComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";
import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [RangeDateTimeLimitComponent],
    exports: [RangeDateTimeLimitComponent],
    imports: [JigsawRadioModule, CommonModule, JigsawDemoDescriptionModule, JigsawRangeDateTimePickerModule, JigsawHeaderModule, DemoTemplateModule]
})
export class RangeDateTimeLimitModule {

}
