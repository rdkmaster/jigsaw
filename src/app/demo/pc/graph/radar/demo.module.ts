import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/pc-components/graph/index";
import {RadarGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [RadarGraphComponent],
    exports: [RadarGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule, CommonModule]
})
export class RadarGraphModule {

}
