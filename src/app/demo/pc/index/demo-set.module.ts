import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { JigsawIndexBasicDemoModule } from "./basic/demo.module";
import { JigsawIndexBasicDemoComponent } from "./basic/demo.component";

export const routerConfig = [
    { path: "basic", component: JigsawIndexBasicDemoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routerConfig), JigsawIndexBasicDemoModule]
})
export class IndexDemoModule {}
