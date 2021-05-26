import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {WithPagingInfoDemoModule} from "./with-page-info/demo.module";
import {PaginationBasicDemoModule} from "./basic/demo.module";

import {PaginationBasicDemoComponent} from "./basic/demo.component";
import {WithPagingInfoDemoComponent} from "./with-page-info/demo.component";
import {PaginationBigDataDemoComponent} from "./big-data/demo.component";
import {PaginationBigDataDemoModule} from "./big-data/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: PaginationBasicDemoComponent
    },
    {
        path: 'with-page-info', component: WithPagingInfoDemoComponent
    },
    {
        path: 'big-data', component: PaginationBigDataDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        PaginationBasicDemoModule,
        WithPagingInfoDemoModule,
        PaginationBigDataDemoModule
    ]
})
export class PaginationDemoModule { }
