import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawBreadcrumbModule, JigsawNumericInputModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { BreadcrumbFoldDemoComponent } from "./demo.component";

@NgModule({
    declarations: [BreadcrumbFoldDemoComponent],
    exports: [BreadcrumbFoldDemoComponent],
    imports: [CommonModule, JigsawBreadcrumbModule, JigsawNumericInputModule, JigsawDemoDescriptionModule]
})
export class BreadcrumbFoldDemoModule {}
