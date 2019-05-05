import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BreadcrumbRouterDemoComponent} from "./demo.component";
import {JigsawBreadcrumbModule} from "jigsaw/pc-components/breadcrumb/breadcrumb";
import {RouterModule} from "@angular/router";
import {BreadcrumbRouterList} from "./list/list";
import {BreadcrumbRouterDetail} from "./detail/detail";
import {BreadcrumbRouterBuy} from "./buy/buy";
import {ProductService} from "./product.service";
import {CommonModule} from "@angular/common";


/* #for-live-demo-only#
const routes = [
    {
        path: 'router', pc-components: BreadcrumbRouterDemoComponent,
        children: [
            {
                path: 'list/:typeId', pc-components: BreadcrumbRouterList
            },
            {
                path: 'detail/:id', pc-components: BreadcrumbRouterDetail
            },
            {
                path: 'buy/:id', pc-components: BreadcrumbRouterBuy
            }
        ]
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
