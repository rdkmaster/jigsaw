import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawBreadcrumbModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { BreadcrumbModeDemoComponent } from "./demo.component";

@NgModule({
    declarations: [BreadcrumbModeDemoComponent],
    exports: [BreadcrumbModeDemoComponent],
    imports: [CommonModule, JigsawBreadcrumbModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class BreadcrumbModeDemoModule {}
