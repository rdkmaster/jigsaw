import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationFullComponent} from './app.component';

import {JigsawNotificationModule} from "../../../jigsaw/component/notification/notification.module";
import {JigsawButtonModule} from "../../../jigsaw/component/button/button";
import {JigsawNotification} from "../../../jigsaw/component/notification/notification.component";
import {PopupService} from "../../../jigsaw/service/popup.service";

@NgModule({
    imports: [
        CommonModule,
        JigsawNotificationModule,
        JigsawButtonModule
    ],
    declarations: [NotificationFullComponent],
    bootstrap: [NotificationFullComponent],
    providers: [PopupService, JigsawNotification],
})
export class NotificationFullModule {
}
