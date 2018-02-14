import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawNotificationModule} from "jigsaw/component/notification/notification";
import {PopupService} from "jigsaw/service/popup.service";

import {NotificationFullDemoComponent} from "./demo.component";

@NgModule({
    declarations: [NotificationFullDemoComponent],
    imports: [JigsawButtonModule, JigsawNotificationModule],
    providers: [PopupService],
})
export class NotificationFullDemoModule {
}
