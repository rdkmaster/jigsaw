import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { JigsawHeaderModule, JigsawAlphabeticalIndexModule } from "jigsaw/public_api";
import { JigsawAlphabeticalIndexSelectDemoComponent } from "./demo.component";

@NgModule({
    imports: [JigsawHeaderModule, CommonModule, JigsawDemoDescriptionModule, JigsawAlphabeticalIndexModule],
    declarations: [JigsawAlphabeticalIndexSelectDemoComponent],
    exports: [JigsawAlphabeticalIndexSelectDemoComponent]
})
export class JigsawAlphabeticalIndexSelectDemoModule {}
