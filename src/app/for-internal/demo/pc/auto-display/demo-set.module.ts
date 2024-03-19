import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { JigsawAutoDisplayBasicDemoModule } from "./basic/demo.module";
import { JigsawAutoDisplayBasicDemoComponent } from "./basic/demo.component";
import { JigsawAutoDisplayModeledGraphDemoModule } from "./modeled-graph/demo.module";
import { JigsawAutoDisplayModeledGraphDemoComponent } from "./modeled-graph/demo.component";

export const routerConfig = [
    { path: "basic", component: JigsawAutoDisplayBasicDemoComponent },
    { path: "modeled-graph", component: JigsawAutoDisplayModeledGraphDemoComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routerConfig), JigsawAutoDisplayBasicDemoModule, JigsawAutoDisplayModeledGraphDemoModule]
})
export class AutoDisplayDemoModule { }
