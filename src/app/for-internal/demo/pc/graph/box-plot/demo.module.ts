import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawGraphModule, JigsawHeaderModule} from "jigsaw/public_api";
import {BoxPlotGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    declarations: [BoxPlotGraphComponent],
    exports: [BoxPlotGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule, CommonModule, JigsawHeaderModule]
})
export class BoxPlotGraphModule {

}
