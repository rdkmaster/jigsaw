import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { JigsawInsightBasicDemoModule } from "./basic/demo.module";
import { JigsawInsightBasicDemoComponent } from "./basic/demo.component";

export const routerConfig = [
    { path: "basic", component: JigsawInsightBasicDemoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routerConfig), JigsawInsightBasicDemoModule]
})
export class HeaderDemoModule {}
