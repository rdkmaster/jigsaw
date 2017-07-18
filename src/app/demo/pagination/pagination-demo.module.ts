import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import { PaginationBasicDemoComponent } from "./basic/app.component";
import {ServerSidePagingDemoComponent} from "./with-table-data/app.component";
import {ServerSidePagingDemoModule} from "./with-table-data/app.module";
import {PaginationBasicDemoModule} from "./basic/app.module";


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
    imports: [
        RouterModule.forChild(inputDemoRoutes),
        PaginationBasicDemoModule,
        ServerSidePagingDemoModule
    ]
})
export class PaginationDemoModule { }
