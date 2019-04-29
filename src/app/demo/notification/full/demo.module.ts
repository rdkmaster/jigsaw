import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawNotificationModule} from "jigsaw/pc-components/notification/notification";
import {PopupService} from "jigsaw/common/service/popup.service";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {JigsawRadioModule} from "jigsaw/pc-components/radio/radio";
import {JigsawSliderModule} from "jigsaw/pc-components/slider/index";
import {JigsawTooltipModule} from "jigsaw/pc-components/tooltip/tooltip";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

import {NotificationFullDemoComponent} from "./demo.component";

@NgModule({
    declarations: [NotificationFullDemoComponent],
    imports: [
        JigsawButtonModule, JigsawNotificationModule, JigsawInputModule,
        JigsawRadioModule, JigsawSliderModule, JigsawTooltipModule, JigsawDemoDescriptionModule
    ],
    providers: [PopupService],
    exports: [NotificationFullDemoComponent]
})
export class NotificationFullDemoModule {
}
