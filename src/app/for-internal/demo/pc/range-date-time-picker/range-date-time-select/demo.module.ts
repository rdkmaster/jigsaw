import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonBarModule, JigsawButtonModule, JigsawRadioModule, JigsawRangeDateTimeSelectModule, JigsawSelectModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {RangeDateTimeSelectComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [RangeDateTimeSelectComponent],
    exports: [RangeDateTimeSelectComponent],
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawButtonBarModule, JigsawRangeDateTimeSelectModule, JigsawRadioModule,
        JigsawSelectModule, JigsawHeaderModule, JigsawSwitchModule, JigsawButtonModule]
})
export class RangeDateTimeSelectModule {

}
