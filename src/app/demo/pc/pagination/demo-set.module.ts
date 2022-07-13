import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { WithPagingInfoDemoModule } from "./with-page-info/demo.module";
import { PaginationBasicDemoModule } from "./basic/demo.module";
import { PaginationSizeDemoComponent } from "./size/demo.component";
import { PaginationSizeDemoModule } from "./size/demo.module";
import {PaginationBasicDemoComponent} from "./basic/demo.component";
import {WithPagingInfoDemoComponent} from "./with-page-info/demo.component";
import {PaginationBigDataDemoComponent} from "./big-data/demo.component";
import {PaginationBigDataDemoModule} from "./big-data/demo.module";
import { PaginationNoDataDemoComponent } from './no-data/demo.component';
import { PaginationNoDataDemoModule } from './no-data/demo.module';
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {PaginationAllComponent} from "./demo.component";

export const routerConfig = [
    {
        path: "all",
        component: PaginationAllComponent
    },
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
    },
    {
        path: 'big-data',
        component: PaginationBigDataDemoComponent
    },
    {
        path: 'no-data',
        component: PaginationNoDataDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        PaginationBasicDemoModule,
        WithPagingInfoDemoModule,
        PaginationSizeDemoModule,
        PaginationBigDataDemoModule,
        PaginationNoDataDemoModule,
        JigsawMarkdownModule
    ],
    declarations: [PaginationAllComponent]
})
export class PaginationDemoModule {}
