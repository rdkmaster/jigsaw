import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { JigsawNoviceGuideBasicDemoModule } from "./basic/demo.module";
import { JigsawNoviceGuideBasicDemoComponent } from "./basic/demo.component";

export const routerConfig = [
    { path: "basic", component: JigsawNoviceGuideBasicDemoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routerConfig), JigsawNoviceGuideBasicDemoModule]
})
export class NoviceGuideDemoModule { }
