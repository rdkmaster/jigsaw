import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {NotificationFullDemoComponent} from "./full/demo.component";
import {NotificationFullDemoModule} from "./full/demo.module";

export const routerConfig = [
    {
        path: 'full', component: NotificationFullDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), NotificationFullDemoModule
    ]
})
export class NotificationDemoModule {
}
