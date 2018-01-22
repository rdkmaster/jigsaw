import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ServerSidePagingDemoModule} from "./with-table-data/demo.module";
import {PaginationBasicDemoModule} from "./basic/demo.module";

import {PaginationBasicDemoComponent} from "./basic/demo.component";
import {ServerSidePagingDemoComponent} from "./with-table-data/demo.component";

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
