import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { JigsawNoviceGuideBasicDemoModule } from "./basic/demo.module";
import { JigsawNoviceGuideBasicDemoComponent } from "./basic/demo.component";
import {JigsawNoviceGuideCustomizedStepIdDemoComponent} from "./stepped-novice-version/demo.component";
import {JigsawNoviceGuideCustomizedStepIdDemoModule} from "./stepped-novice-version/demo.module";

export const routerConfig = [
    { path: "basic", component: JigsawNoviceGuideBasicDemoComponent },
    { path: "stepped-novice-version", component: JigsawNoviceGuideCustomizedStepIdDemoComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routerConfig), JigsawNoviceGuideBasicDemoModule, JigsawNoviceGuideCustomizedStepIdDemoModule]
})
export class NoviceGuideDemoModule { }
