import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BreadcrumbBasicDemoModule} from "./basic/demo.module";
import {BreadcrumbBasicDemoComponent} from "./basic/demo.component";
import {BreadcrumbRouterDemoComponent} from "./router/demo.component";
import {BreadcrumbRouterDemoModule} from "./router/demo.module";
import {BreadcrumbRouterDemo1} from "./router/demo1/demo1";
import {BreadcrumbRouterDemo2} from "./router/demo2/demo2";

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
                path: 'demo1', component: BreadcrumbRouterDemo1
            },
            {
                path: 'demo2', component: BreadcrumbRouterDemo2
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        BreadcrumbBasicDemoModule,
        BreadcrumbRouterDemoModule
    ]
})
export class BreadcrumbDemoModule {
}
