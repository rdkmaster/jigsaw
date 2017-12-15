import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawNotificationModule,JigsawNotification} from "jigsaw/component/notification/notification";
import {PopupService} from "jigsaw/service/popup.service";
import {NotificationDemo} from "./app.component";

const notificationDemoRoutes = [
    {path: 'notification', component: NotificationDemo}
];

@NgModule({
    declarations: [NotificationDemo],
    bootstrap: [ NotificationDemo ],
    imports: [RouterModule.forChild(notificationDemoRoutes),JigsawButtonModule,JigsawNotificationModule],
    providers: [PopupService,JigsawNotification],
})
export class NotificationDemoModule{}
