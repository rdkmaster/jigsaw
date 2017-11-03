import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TreeBasicDemoModule} from "./basic/app.module";
import {TreeAsyncDemoModule} from "./async/app.module";
import {TreeAjaxDataDemoModule} from "./data-from-ajax/app.module";
import {TreeEditableDemoModule} from "./editable/app.module";

import {ZtreeDemoComponent} from "./basic/app.component";
import {ZtreeDemoDataFromAjaxComponent} from "./data-from-ajax/app.component";
import {ZtreeDemoEditableComponent} from "./editable/app.component";
import {ZtreeAsynDemoComponent} from "./async/app.component";

export const routerConfig = [
    {
        path: 'basic', component: ZtreeDemoComponent
    },
    {
        path: 'data-from-ajax', component: ZtreeDemoDataFromAjaxComponent
    },
    {
        path: 'editable', component: ZtreeDemoEditableComponent
    },
    {
        path: 'async', component: ZtreeAsynDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TreeAsyncDemoModule, TreeBasicDemoModule, TreeAjaxDataDemoModule, TreeEditableDemoModule
    ],
    exports: [
    ],
    providers: []
})
export class ZtreeDemoModule { }
