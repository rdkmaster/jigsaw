import {NgModule} from "@angular/core";
import { HttpModule } from '@angular/http';
import {RouterModule} from "@angular/router";
import {ZtreeDemoComponent} from "./basic/basic";
import { RdkTreeExtModule } from "../../../../component/ztree/ztree-ext"

const ztreeDemoRoutes=[
    {
        path:'',
        redirectTo:'basic',
        pathMatch:'full'
    },
    {
        path:'basic', component: ZtreeDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: ZtreeDemoComponent
    }
];

@NgModule({
    declarations: [
        ZtreeDemoComponent
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
