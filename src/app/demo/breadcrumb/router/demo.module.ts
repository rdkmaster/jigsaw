import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BreadcrumbRouterDemoComponent} from "./demo.component";
import {JigsawBreadcrumbModule} from "jigsaw/component/breadcrumb/breadcrumb";
import {RouterModule} from "@angular/router";
import {BreadcrumbRouterDemo1Module} from "./demo1/demo1";
import {BreadcrumbRouterDemo2Module} from "./demo2/demo2";

@NgModule({
    declarations: [BreadcrumbRouterDemoComponent],
    exports: [ BreadcrumbRouterDemoComponent ],
    imports: [JigsawBreadcrumbModule, JigsawDemoDescriptionModule,
        BreadcrumbRouterDemo1Module, BreadcrumbRouterDemo2Module, RouterModule]
})
export class BreadcrumbRouterDemoModule{

}
