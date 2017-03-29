import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import { RdkPaginationModule } from "../../../../component/pagination/pagination";
import { PaginationBasicDemoComponent } from "./basic/basic";


const inputDemoRoutes=[
    {
        path:'',
        redirectTo:'basic',
        pathMatch:'full'
    },
    {
        path:'basic', component: PaginationBasicDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: PaginationBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        PaginationBasicDemoComponent
    ],
    imports: [
        RouterModule.forChild(inputDemoRoutes), RdkPaginationModule
    ],
    exports: [
        PaginationBasicDemoComponent
    ],
    providers: []
})
export class PaginationDemoModule { }
