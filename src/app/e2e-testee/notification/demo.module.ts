import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {NotificationFullComponent} from "../../live-demo/notification/app.component";
import {NotificationFullModule} from "../../live-demo/notification/app.module";
import {NotificationFullDemoModule} from "./notification/app.module";


const notificationDemoRoutes = [
    {   path: 'notification-full',
        component: NotificationFullComponent
    },
    {
        path: '**', // fallback router must in the last
        component: NotificationFullComponent
    }
];

@NgModule({
  imports: [
      CommonModule,
      NotificationFullModule,
      NotificationFullDemoModule,
      RouterModule.forChild(notificationDemoRoutes),
  ],
  declarations: []
})
export class NotificationDemoModule { }
