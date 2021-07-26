import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {NotificationFullDemoComponent} from "./full/demo.component";
import {NotificationFullDemoModule} from "./full/demo.module";
import {NotificationBasicDemoComponent} from "./basic/demo.component";
import {NotificationBasicDemoModule} from "./basic/demo.module";
import {NotificationDisposeOnRouterDemoComponent} from "./dispose-on-router-changed/demo.component";
import {NotificationDisposeOnRouterDemoModule} from "./dispose-on-router-changed/demo.module";

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
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), NotificationFullDemoModule, 
        NotificationBasicDemoModule, NotificationDisposeOnRouterDemoModule,
    ],
})
export class NotificationDemoModule {
}
