import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BreadcrumbBasicDemoModule} from "./basic/demo.module";
import {BreadcrumbBasicDemoComponent} from "./basic/demo.component";
import {BreadcrumbRouterDemoComponent} from "./router/demo.component";
import {BreadcrumbRouterDemoModule} from "./router/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: BreadcrumbBasicDemoComponent
    },
    {
        path: 'router', component: BreadcrumbRouterDemoComponent
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
