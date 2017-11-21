import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NotificationDemoComponent} from './app.component';
import {JigsawNotificationModule} from "../../../../jigsaw/component/notification/notification.module";

@NgModule({
    imports: [
        CommonModule,
        JigsawNotificationModule
    ],
    declarations: [NotificationDemoComponent],
    bootstrap: [NotificationDemoComponent],
})
export class NotificationFullDemoModule {
}
