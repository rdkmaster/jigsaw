import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawGraphModule, JigsawHeaderModule} from "jigsaw/public_api";
import {GaugeGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [GaugeGraphComponent],
    exports: [GaugeGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule, CommonModule, JigsawHeaderModule]
})
export class GaugeGraphModule {

}
