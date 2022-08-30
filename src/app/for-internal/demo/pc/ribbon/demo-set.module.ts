import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { JigsawHeaderBasicDemoModule } from "./basic/demo.module";
import { JigsawRibbonBasicDemoComponent } from "./basic/demo.component";
import {RibbonMoveDemoComponent} from "./move-and-opacity/demo.component";
import {RibbonMoveDemoModule} from "./move-and-opacity/demo.module";

export const routerConfig = [
    { path: "basic", component: JigsawRibbonBasicDemoComponent },
    { path: "move-and-opacity", component: RibbonMoveDemoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routerConfig), JigsawHeaderBasicDemoModule, RibbonMoveDemoModule]
})
export class RibbonDemoModule { }
