import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRangeDateTimePickerModule, JigsawRadioModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {RangeDateTimeLimitComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [RangeDateTimeLimitComponent],
    exports: [RangeDateTimeLimitComponent],
    imports: [JigsawRadioModule, CommonModule, JigsawDemoDescriptionModule, JigsawRangeDateTimePickerModule, JigsawHeaderModule]
})
export class RangeDateTimeLimitModule {

}
