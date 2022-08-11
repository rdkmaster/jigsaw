import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {JigsawBreadcrumbModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {BreadcrumbRouterDemoComponent} from "./demo.component";
import {BreadcrumbRouterList} from "./list/list";
import {BreadcrumbRouterDetail} from "./detail/detail";
import {BreadcrumbRouterBuy} from "./buy/buy";
import {ProductService} from "./product.service";

/* #for-live-demo-only#
const routes = [
    {
        path: 'list/:typeId', component: BreadcrumbRouterList
    },
    {
        path: 'detail/:id', component: BreadcrumbRouterDetail
    },
    {
        path: 'buy/:id', component: BreadcrumbRouterBuy
    }
];
*/

@NgModule({
    declarations: [
        BreadcrumbRouterDemoComponent, BreadcrumbRouterList,
        BreadcrumbRouterDetail, BreadcrumbRouterBuy
    ],
    exports: [BreadcrumbRouterDemoComponent],
    imports: [
        JigsawBreadcrumbModule, JigsawDemoDescriptionModule, CommonModule,
        RouterModule/* #for-live-demo-only# .forRoot(routes) */
    ],
    providers: [ProductService]
})
export class BreadcrumbRouterDemoModule {

}
