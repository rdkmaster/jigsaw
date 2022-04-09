import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { JigsawAnimationKnowledgeDemoModule } from "./knowledge/demo.module";
import { JigsawAnimationKnowledgeDemoComponent } from "./knowledge/demo.component";

export const routerConfig = [
    { path: "knowledge", component: JigsawAnimationKnowledgeDemoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routerConfig), JigsawAnimationKnowledgeDemoModule]
})
export class AnimationDemoModule { }
