import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BreadcrumbBasicDemoModule} from "./basic/demo.module";
import {BreadcrumbBasicDemoComponent} from "./basic/demo.component";
import {BreadcrumbRouterDemoComponent} from "./router/demo.component";
import {BreadcrumbRouterDemoModule} from "./router/demo.module";
import {BreadcrumbRouterFruits} from "./router/fruits/fruits";
import {BreadcrumbRouterDigital} from "./router/digital/digital";
import {BreadcrumbRouterDetail, BreadcrumbRouterDetailModule} from "./router/detail/detail";

export const routerConfig = [
    /*{
        path: '', redirectTo: 'router'
    },*/
    {
        path: 'basic', component: BreadcrumbBasicDemoComponent
    },
    {
        path: 'router', component: BreadcrumbRouterDemoComponent,
        children: [
            {
                path: 'fruits', component: BreadcrumbRouterFruits,
                children: [
                    {
                        path: 'detail/:id', component: BreadcrumbRouterDetail
                    }
                ]
            },
            {
                path: 'digital', component: BreadcrumbRouterDigital,
                children: [
                    {
                        path: 'detail/:id', component: BreadcrumbRouterDetail
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        BreadcrumbBasicDemoModule,
        BreadcrumbRouterDemoModule,
        BreadcrumbRouterDetailModule
    ]
})
export class BreadcrumbDemoModule {
}
