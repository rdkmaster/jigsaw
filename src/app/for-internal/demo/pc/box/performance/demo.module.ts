import {NgModule} from "@angular/core";
import {CommonModule, } from "@angular/common";
import {JigsawBoxModule, JigsawGraphModule, JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {BoxPerformanceDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BoxPerformanceDemoComponent],
    exports: [BoxPerformanceDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawBoxModule, CommonModule, JigsawHeaderModule, JigsawGraphModule]
})
export class BoxPerformanceDemoModule {

}
