import { NgModule, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawButtonModule, JigsawInputModule, PageableSelectArray } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { PageableSelectArrayDemoComponent } from "./demo.component";

@NgModule({
    declarations: [PageableSelectArrayDemoComponent],
    exports: [PageableSelectArrayDemoComponent],
    imports: [JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule, JigsawInputModule]
})
export class PageableSelectArrayDemoModule {
}
