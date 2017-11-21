import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JigsawNotification} from './notification.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [JigsawNotification],
    exports: [JigsawNotification]
})
export class JigsawNotificationModule {
}
