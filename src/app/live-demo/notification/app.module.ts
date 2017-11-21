import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationFullComponent} from './app.component';

import {JigsawNotificationModule} from "../../../jigsaw/component/notification/notification.module";
import {JigsawButtonModule} from "../../../jigsaw/component/button/button";

@NgModule({
    imports: [
        CommonModule,
        JigsawNotificationModule,
        JigsawButtonModule
    ],
    declarations: [NotificationFullComponent],
    bootstrap: [NotificationFullComponent],
})
export class NotificationFullModule {
}
