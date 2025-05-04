import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { JigsawAutoDisplayBasicDemoModule } from "./basic/demo.module";
import { JigsawAutoDisplayBasicDemoComponent } from "./basic/demo.component";
import { JigsawAutoDisplayDirectiveDemoComponent } from "./directive/demo.component";
import { JigsawAutoDisplayDirectiveDemoModule } from "./directive/demo.module";

export const routerConfig = [
    { path: "directive", component: JigsawAutoDisplayDirectiveDemoComponent },
    { path: "basic", component: JigsawAutoDisplayBasicDemoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routerConfig), JigsawAutoDisplayBasicDemoModule, JigsawAutoDisplayDirectiveDemoModule]
})
export class AutoDisplayDemoModule { }
