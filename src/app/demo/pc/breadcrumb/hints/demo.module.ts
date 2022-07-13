import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawBreadcrumbModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { BreadcrumbHintDemoComponent } from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [BreadcrumbHintDemoComponent],
    exports: [BreadcrumbHintDemoComponent],
    imports: [CommonModule, JigsawBreadcrumbModule, JigsawDemoDescriptionModule, DemoTemplateModule]
})
export class BreadcrumbHintDemoModule {}
