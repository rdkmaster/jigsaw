import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {ZtreeDemoComponent} from "./basic/app.component";
import {TreeBasicDemoModule} from "./basic/app.module";

import {ZtreeAsynDemoComponent} from "./async/app.component";
import {TreeAsyncDemoModule} from "./async/app.module";

import {ZtreeDemoDataFromAjaxComponent} from "./dataFromAjax/app.component";
import {TreeAjaxDataDemoModule} from "./dataFromAjax/app.module";

import {ZtreeDemoEditableComponent} from "./editable/app.component";
import {TreeEditableDemoModule} from "./editable/app.module";

const ztreeDemoRoutes=[
    {
        path:'',
        redirectTo:'basic',
        pathMatch:'full'
    },
    {
        path:'basic', component: ZtreeDemoComponent
    }, {
        path:'dataFromAjax', component: ZtreeDemoDataFromAjaxComponent
    },{
        path:'editable', component: ZtreeDemoEditableComponent
    },{
        path:'async', component: ZtreeAsynDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: ZtreeDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ztreeDemoRoutes), TreeAsyncDemoModule,
        TreeBasicDemoModule, TreeAjaxDataDemoModule, TreeEditableDemoModule
    ],
    exports: [
    ],
    providers: []
})
export class ZtreeDemoModule { }
