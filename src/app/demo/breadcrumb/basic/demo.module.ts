import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BreadcrumbBasicDemoComponent} from "./demo.component";
import {JigsawBreadcrumbModule} from "jigsaw/component/breadcrumb/breadcrumb";

@NgModule({
    declarations: [BreadcrumbBasicDemoComponent],
    exports: [ BreadcrumbBasicDemoComponent ],
    imports: [CommonModule, JigsawBreadcrumbModule, JigsawDemoDescriptionModule]
})
export class BreadcrumbBasicDemoModule{

}
