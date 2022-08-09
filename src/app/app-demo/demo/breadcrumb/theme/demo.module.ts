import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawBreadcrumbModule, JigsawHeaderModule } from "jigsaw/public_api";
import { BreadcrumbModeDemoComponent } from "./demo.component";
import { DemoTemplateModule } from "../../../demo-template/demo-template";

@NgModule({
    declarations: [BreadcrumbModeDemoComponent],
    exports: [BreadcrumbModeDemoComponent],
    imports: [CommonModule, JigsawBreadcrumbModule, JigsawHeaderModule, DemoTemplateModule]
})
export class BreadcrumbModeDemoModule { }
