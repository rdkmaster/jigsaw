import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {WithPagingInfoDemoModule} from "./with-page-info/demo.module";
import {PaginationBasicDemoModule} from "./basic/demo.module";

import {PaginationBasicDemoComponent} from "./basic/demo.component";
import {WithPagingInfoDemoComponent} from "./with-page-info/demo.component";

export const routerConfig = [
    {
        path: 'basic', component: PaginationBasicDemoComponent
    },
    {
        path: 'with-page-info', component: WithPagingInfoDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        PaginationBasicDemoModule,
        WithPagingInfoDemoModule
    ]
})
export class PaginationDemoModule { }
