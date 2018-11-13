import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BreadcrumbRouterDemoComponent} from "./demo.component";
import {JigsawBreadcrumbModule} from "jigsaw/component/breadcrumb/breadcrumb";

@NgModule({
    declarations: [BreadcrumbRouterDemoComponent],
    exports: [ BreadcrumbRouterDemoComponent ],
    imports: [JigsawBreadcrumbModule, JigsawDemoDescriptionModule]
})
export class BreadcrumbRouterDemoModule{

}
