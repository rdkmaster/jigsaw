import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BreadcrumbRouterDemoComponent} from "./demo.component";
import {JigsawBreadcrumbModule} from "jigsaw/component/breadcrumb/breadcrumb";
import {RouterModule} from "@angular/router";
import {BreadcrumbRouterFruitsModule} from "./fruits/fruits";
import {BreadcrumbRouterDigitalModule} from "./digital/digital";

@NgModule({
    declarations: [BreadcrumbRouterDemoComponent],
    exports: [ BreadcrumbRouterDemoComponent ],
    imports: [JigsawBreadcrumbModule, JigsawDemoDescriptionModule,
        BreadcrumbRouterFruitsModule, BreadcrumbRouterDigitalModule, RouterModule]
})
export class BreadcrumbRouterDemoModule{

}
