import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ZtreeDemoComponent} from "./basic/basic";
import { RdkTreeExtModule } from "../../../../component/ztree/ztreeExt"

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
        RouterModule.forChild(ztreeDemoRoutes),RdkTreeExtModule
    ],
    exports: [
        ZtreeDemoComponent
    ],
    providers: []
})
export class ZtreeDemoModule { }
