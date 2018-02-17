import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawNotificationModule} from "jigsaw/component/notification/notification";
import {PopupService} from "jigsaw/service/popup.service";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {JigsawSliderModule} from "jigsaw/component/slider/index";
import {JigsawTooltipModule} from "jigsaw/component/tooltip/tooltip";

import {NotificationFullDemoComponent} from "./demo.component";

@NgModule({
    declarations: [NotificationFullDemoComponent],
    imports: [
        JigsawButtonModule, JigsawNotificationModule, JigsawInputModule,
        JigsawRadioModule, JigsawSliderModule, JigsawTooltipModule
    ],
    providers: [PopupService],
})
export class NotificationFullDemoModule {
}
