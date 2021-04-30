import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { WithPagingInfoDemoModule } from "./with-page-info/demo.module";
import { PaginationBasicDemoModule } from "./basic/demo.module";

import { PaginationBasicDemoComponent } from "./basic/demo.component";
import { WithPagingInfoDemoComponent } from "./with-page-info/demo.component";
import { PaginationSizeDemoComponent } from "./size/demo.component";
import { PaginationSizeDemoModule } from "./size/demo.module";

export const routerConfig = [
    {
        path: "basic",
        component: PaginationBasicDemoComponent
    },
    {
        path: "with-page-info",
        component: WithPagingInfoDemoComponent
    },
    {
        path: "size",
        component: PaginationSizeDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        PaginationBasicDemoModule,
        WithPagingInfoDemoModule,
        PaginationSizeDemoModule
    ]
})
export class PaginationDemoModule {}
