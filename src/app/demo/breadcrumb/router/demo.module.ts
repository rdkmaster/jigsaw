import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BreadcrumbRouterDemoComponent} from "./demo.component";
import {JigsawBreadcrumbModule} from "jigsaw/component/breadcrumb/breadcrumb";
import {RouterModule} from "@angular/router";
import {BreadcrumbRouterFruits} from "./fruits/fruits";
import {BreadcrumbRouterDigital} from "./digital/digital";
import {BreadcrumbRouterDetail} from "./detail/detail";
import {BreadcrumbRouterBuy} from "./buy/buy";
import {ProductService} from "./product.service";

@NgModule({
    declarations: [BreadcrumbRouterDemoComponent, BreadcrumbRouterFruits, BreadcrumbRouterDigital,
        BreadcrumbRouterDetail, BreadcrumbRouterBuy],
    exports: [BreadcrumbRouterDemoComponent],
    imports: [JigsawBreadcrumbModule, JigsawDemoDescriptionModule, RouterModule],
    providers: [ProductService]
})
export class BreadcrumbRouterDemoModule {

}
