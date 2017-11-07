import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ServerSidePagingDemoModule} from "./with-table-data/app.module";
import {PaginationBasicDemoModule} from "./basic/app.module";

import {PaginationBasicDemoComponent} from "./basic/app.component";
import {ServerSidePagingDemoComponent} from "./with-table-data/app.component";

export const routerConfig = [
    {
        path: 'basic', component: PaginationBasicDemoComponent
    },
    {
        path: 'with-table-data', component: ServerSidePagingDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        PaginationBasicDemoModule,
        ServerSidePagingDemoModule
    ]
})
export class PaginationDemoModule { }
