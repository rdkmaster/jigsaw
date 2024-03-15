import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { JigsawSystemPromptBasicDemoModule } from "./basic/demo.module";
import { JigsawSystemPromptBasicDemoComponent } from "./basic/demo.component";

export const routerConfig = [
    { path: "basic", component: JigsawSystemPromptBasicDemoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routerConfig), JigsawSystemPromptBasicDemoModule]
})
export class SystemPromptDemoModule {}
