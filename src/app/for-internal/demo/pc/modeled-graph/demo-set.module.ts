import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FunnelGraphComponent } from "./funnel/demo.component";
import { FunnelGraphModule } from "./funnel/demo.module";

export const routerConfig = [
    { path: "pie", component: FunnelGraphComponent },
    { path: "funnel", component: FunnelGraphComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routerConfig), FunnelGraphModule]
})
export class ModeledGraphDemoModule { }
