import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import { JigsawPaginationModule } from "jigsaw/component/pagination/pagination";
import { PaginationBasicDemoComponent } from "./basic/demo";
import {ServerSidePagingDemoComponent} from "./with-table-data/demo";


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
        path:'with-table-data', component: ServerSidePagingDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: PaginationBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        PaginationBasicDemoComponent, ServerSidePagingDemoComponent
    ],
    imports: [
        RouterModule.forChild(inputDemoRoutes), JigsawPaginationModule
    ],
    exports: [
        PaginationBasicDemoComponent, ServerSidePagingDemoComponent
    ],
    providers: []
})
export class PaginationDemoModule { }
