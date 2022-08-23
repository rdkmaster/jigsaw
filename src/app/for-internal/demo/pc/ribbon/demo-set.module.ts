import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { JigsawHeaderBasicDemoModule } from "./basic/demo.module";
import { JigsawRibbonBasicDemoComponent } from "./basic/demo.component";

export const routerConfig = [
    { path: "basic", component: JigsawRibbonBasicDemoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routerConfig), JigsawHeaderBasicDemoModule]
})
export class RibbonDemoModule { }
