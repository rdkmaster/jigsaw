import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { JigsawTitleBasicDemoModule } from "./basic/demo.module";
import { JigsawTitleBasicDemoComponent } from "./basic/demo.component";

export const routerConfig = [
    { path: "basic", component: JigsawTitleBasicDemoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routerConfig), JigsawTitleBasicDemoModule]
})
export class TitleDemoModule {}
