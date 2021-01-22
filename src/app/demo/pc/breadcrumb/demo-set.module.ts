import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BreadcrumbBasicDemoModule} from "./basic/demo.module";
import {BreadcrumbBasicDemoComponent} from "./basic/demo.component";
import {BreadcrumbRouterDemoComponent} from "./router/demo.component";
import {BreadcrumbRouterDemoModule} from "./router/demo.module";
import {BreadcrumbRouterList} from "./router/list/list";
import {BreadcrumbRouterDetail} from "./router/detail/detail";
import {BreadcrumbRouterBuy} from "./router/buy/buy";
import { BreadcrumbHintDemoComponent } from "./hints/demo.component";
import { BreadcrumbHintDemoModule } from "./hints/demo.module"

export const routerConfig = [
    {
        path: 'basic', component: BreadcrumbBasicDemoComponent
    },
    {
        path: 'hint', component: BreadcrumbHintDemoComponent
    },
    {
        path: 'router', component: BreadcrumbRouterDemoComponent,
        children: [
            {
                path: 'list/:typeId', component: BreadcrumbRouterList
            },
            {
                path: 'detail/:id', component: BreadcrumbRouterDetail
            },
            {
                path: 'buy/:id', component: BreadcrumbRouterBuy
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        BreadcrumbBasicDemoModule,
        BreadcrumbHintDemoModule,
        BreadcrumbRouterDemoModule
    ]
})
export class BreadcrumbDemoModule {
}
