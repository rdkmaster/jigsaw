import {NgModule} from "@angular/core";
import {JigsawMobileGraphModule} from "jigsaw/mobile-components/graph/index";
import {HeatGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [HeatGraphComponent],
    exports: [HeatGraphComponent],
    imports: [JigsawMobileGraphModule, JigsawDemoDescriptionModule, CommonModule]
})
export class HeatGraphModule {

}
