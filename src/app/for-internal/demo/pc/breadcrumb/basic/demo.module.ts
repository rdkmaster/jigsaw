import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawBreadcrumbModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {BreadcrumbBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BreadcrumbBasicDemoComponent],
    exports: [ BreadcrumbBasicDemoComponent ],
    imports: [CommonModule, JigsawBreadcrumbModule, JigsawDemoDescriptionModule]
})
export class BreadcrumbBasicDemoModule{

}
