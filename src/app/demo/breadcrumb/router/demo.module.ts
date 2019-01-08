import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BreadcrumbRouterDemoComponent} from "./demo.component";
import {JigsawBreadcrumbModule} from "jigsaw/component/breadcrumb/breadcrumb";
import {RouterModule} from "@angular/router";
import {BreadcrumbRouterList} from "./list/list";
import {BreadcrumbRouterDetail} from "./detail/detail";
import {BreadcrumbRouterBuy} from "./buy/buy";
import {ProductService} from "./product.service";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [BreadcrumbRouterDemoComponent, BreadcrumbRouterList,
        BreadcrumbRouterDetail, BreadcrumbRouterBuy],
    exports: [BreadcrumbRouterDemoComponent],
    imports: [JigsawBreadcrumbModule, JigsawDemoDescriptionModule, RouterModule, CommonModule],
    providers: [ProductService]
})
export class BreadcrumbRouterDemoModule {

}
