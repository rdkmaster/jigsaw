import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../../demo/demo-template/demo-template';
import { JigsawMarkdownModule } from '../../../markdown/markdown';
import { JigsawButtonModule, JigsawHeaderModule, JigsawBreadcrumbModule} from "jigsaw/public_api";
import {BreadcrumbBasicDemoComponent} from "./basic/demo.component";
import {BreadcrumbAllComponent} from "./demo.component";
import {BreadcrumbHintDemoComponent} from "./hints/demo.component";
import {BreadcrumbFoldDemoComponent} from "./multi-level/demo.component";
import {RouterModule} from "@angular/router";
import {BreadcrumbRouterDemoComponent} from "./router/demo.component";
import {BreadcrumbRouterList} from "./router/list/list";
import {BreadcrumbRouterDetail} from "./router/detail/detail";
import {BreadcrumbRouterBuy} from "./router/buy/buy";
import {CommonModule} from "@angular/common";
import {ProductService} from "./router/product.service";

@NgModule({
    declarations: [
        BreadcrumbAllComponent,
        BreadcrumbBasicDemoComponent,
        BreadcrumbHintDemoComponent,
        BreadcrumbFoldDemoComponent,
        BreadcrumbRouterDemoComponent,
        BreadcrumbRouterList,
        BreadcrumbRouterDetail,
        BreadcrumbRouterBuy
    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawButtonModule,
        JigsawHeaderModule,
        JigsawBreadcrumbModule,
        RouterModule,
        CommonModule
    ],
    providers: [ProductService]
})
export class BreadcrumbDemoModule {
}
