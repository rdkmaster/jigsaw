import {NgModule} from "@angular/core";
import { HttpModule } from '@angular/http';
import {RouterModule} from "@angular/router";
import {ZtreeDemoComponent} from "./basic/basic";
import { RdkTreeExtModule } from "../../../rdk/component/tree/tree-ext"
import {ZtreeDemoDataFromAjaxComponent} from "./dataFromAjax/dataFromAjax";
import {ZtreeDemoEditableComponent} from "./editable/editable";
import {ZtreeAsynDemoComponent} from "./async/async";

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
    declarations: [
        ZtreeDemoComponent,ZtreeDemoDataFromAjaxComponent,ZtreeDemoEditableComponent,ZtreeAsynDemoComponent
    ],
    imports: [
        RouterModule.forChild(ztreeDemoRoutes),RdkTreeExtModule,HttpModule
    ],
    exports: [
        ZtreeDemoComponent
    ],
    providers: []
})
export class ZtreeDemoModule { }
