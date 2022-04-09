import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { JigsawAnimationKnowledgeDemoComponent } from "./demo.component";
import { JigsawHeaderModule } from "jigsaw/public_api";
import { KnowledgeQA } from "./qa";

@NgModule({
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [JigsawAnimationKnowledgeDemoComponent, KnowledgeQA],
    exports: [JigsawAnimationKnowledgeDemoComponent]
})
export class JigsawAnimationKnowledgeDemoModule { }
