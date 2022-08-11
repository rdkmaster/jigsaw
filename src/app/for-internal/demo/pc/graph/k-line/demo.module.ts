import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawGraphModule, JigsawHeaderModule} from "jigsaw/public_api";
import {KLineGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    declarations: [KLineGraphComponent],
    exports: [KLineGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule, CommonModule, JigsawHeaderModule]
})
export class KlineGraphModule {

}
