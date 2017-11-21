import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationFullComponent} from './app.component';

import {JigsawNotificationModule} from "../../../jigsaw/component/notification/notification.module";

@NgModule({
    imports: [
        CommonModule,
        JigsawNotificationModule
    ],
    declarations: [NotificationFullComponent],
    bootstrap: [NotificationFullComponent],
})
export class NotificationFullModule {
}
