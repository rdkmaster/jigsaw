import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { JigsawAutoDisplayBasicDemoModule } from "./basic/demo.module";
import { JigsawAutoDisplayBasicDemoComponent } from "./basic/demo.component";

export const routerConfig = [
    { path: "basic", component: JigsawAutoDisplayBasicDemoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routerConfig), JigsawAutoDisplayBasicDemoModule]
})
export class AutoDisplayDemoModule { }
