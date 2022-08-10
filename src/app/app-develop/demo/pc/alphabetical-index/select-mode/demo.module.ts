import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/app-develop/demo-description/demo-description";
import { JigsawHeaderModule, JigsawAlphabeticalIndexSelectModule } from "jigsaw/public_api";
import { JigsawAlphabeticalIndexSelectDemoComponent } from "./demo.component";
@NgModule({
    imports: [JigsawHeaderModule, CommonModule, JigsawDemoDescriptionModule, JigsawAlphabeticalIndexSelectModule],
    declarations: [JigsawAlphabeticalIndexSelectDemoComponent],
    exports: [JigsawAlphabeticalIndexSelectDemoComponent]
})
export class JigsawAlphabeticalIndexSelectDemoModule { }
