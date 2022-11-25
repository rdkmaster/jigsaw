import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {NotificationFullDemoComponent} from "./full/demo.component";
import {NotificationFullDemoModule} from "./full/demo.module";
import {NotificationBasicDemoComponent} from "./basic/demo.component";
import {NotificationBasicDemoModule} from "./basic/demo.module";
import {NotificationDisposeOnRouterDemoComponent} from "./dispose-on-router-changed/demo.component";
import {NotificationDisposeOnRouterDemoModule} from "./dispose-on-router-changed/demo.module";
import {NotificationWithPromiseDemoComponent} from "./with-promise/demo.component";
import {NotificationWithPromiseDemoModule} from "./with-promise/demo.module";

export const routerConfig = [
    {
        path: 'full', component: NotificationFullDemoComponent
    },
    {
        path: 'basic', component: NotificationBasicDemoComponent
    },
    {
        path: 'dispose-on-router-changed', component: NotificationDisposeOnRouterDemoComponent
    },
    {
        path: 'with-promise', component: NotificationWithPromiseDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), NotificationFullDemoModule,
        NotificationBasicDemoModule, NotificationDisposeOnRouterDemoModule,
        NotificationWithPromiseDemoModule
    ],
})
export class NotificationDemoModule {
}
