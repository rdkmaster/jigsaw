import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FunnelGraphComponent } from "./funnel/demo.component";
import { FunnelGraphModule } from "./funnel/demo.module";
import { PieGraphDemoComponent } from "./pie/demo.component";
import { PieGraphDemoModule } from "./pie/demo.module";
import { RectangularGraphDemoComponent } from "./rectangular/demo.component";
import { RectangularGraphDemoModule } from "./rectangular/demo.module";

export const routerConfig = [
    { path: "pie", component: PieGraphDemoComponent },
    { path: "funnel", component: FunnelGraphComponent },
    { path: "rectangular", component: RectangularGraphDemoComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routerConfig), FunnelGraphModule, PieGraphDemoModule, RectangularGraphDemoModule]
})
export class ModeledGraphDemoModule { }
