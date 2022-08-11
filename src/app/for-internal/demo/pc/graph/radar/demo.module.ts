import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawGraphModule, JigsawHeaderModule} from "jigsaw/public_api";
import {RadarGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    declarations: [RadarGraphComponent],
    exports: [RadarGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule, CommonModule, JigsawHeaderModule]
})
export class RadarGraphModule {

}
