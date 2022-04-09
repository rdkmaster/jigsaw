import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { JigsawAnimationKnowledgeDemoComponent, KnowledgeQA, KnowledgeTips } from "./demo.component";
import { JigsawHeaderModule } from "jigsaw/public_api";

@NgModule({
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [JigsawAnimationKnowledgeDemoComponent, KnowledgeQA, KnowledgeTips],
    exports: [JigsawAnimationKnowledgeDemoComponent]
})
export class JigsawAnimationKnowledgeDemoModule { }
