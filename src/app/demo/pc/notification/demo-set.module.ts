import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {NotificationFullDemoComponent} from "./full/demo.component";
import {NotificationFullDemoModule} from "./full/demo.module";
import {NotificationBasicDemoComponent} from "./basic/demo.component";
import {NotificationBasicDemoModule} from "./basic/demo.module";
import {NotificationDisposeOnRouterDemoComponent} from "./disposeOnRouterChanged/demo.component";
import {NotificationDisposeOnRouterDemoModule} from "./disposeOnRouterChanged/demo.module";

export const routerConfig = [
    {
        path: 'full', component: NotificationFullDemoComponent
    },
    {
        path: 'basic', component: NotificationBasicDemoComponent
    },
    {
        path: 'disposeOnRouterChanged', component: NotificationDisposeOnRouterDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), NotificationFullDemoModule,
        RouterModule.forChild(routerConfig), NotificationBasicDemoModule,
        RouterModule.forChild(routerConfig), NotificationDisposeOnRouterDemoModule,
    ],
})
export class NotificationDemoModule {
}
