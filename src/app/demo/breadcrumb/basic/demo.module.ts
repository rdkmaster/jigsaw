import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BreadcrumbBasicDemoComponent} from "./demo.component";
import {JigsawBreadcrumbModule} from "jigsaw/component/breadcrumb/breadcrumb";

@NgModule({
    declarations: [BreadcrumbBasicDemoComponent],
    exports: [ BreadcrumbBasicDemoComponent ],
    imports: [JigsawBreadcrumbModule, JigsawDemoDescriptionModule]
})
export class BreadcrumbBasicDemoModule{

}
