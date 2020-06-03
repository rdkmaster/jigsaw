import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawGraphModule} from "jigsaw/public_api";
import {BoxPlotGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [BoxPlotGraphComponent],
    exports: [BoxPlotGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule, CommonModule]
})
export class BoxPlotGraphModule {

}
