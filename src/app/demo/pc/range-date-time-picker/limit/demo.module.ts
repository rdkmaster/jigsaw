import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRangeDateTimePickerModule, JigsawRadioModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeDateTimeLimitComponent} from "./demo.component";

@NgModule({
    declarations: [RangeDateTimeLimitComponent],
    exports: [RangeDateTimeLimitComponent],
    imports: [JigsawRadioModule, CommonModule, JigsawDemoDescriptionModule, JigsawRangeDateTimePickerModule]
})
export class RangeDateTimeLimitModule {

}
