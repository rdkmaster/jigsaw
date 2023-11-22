import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawGraphModule, JigsawHeaderModule} from "jigsaw/public_api";
import {BubbleGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    declarations: [BubbleGraphComponent],
    exports: [BubbleGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule, CommonModule, JigsawHeaderModule]
})
export class BubbleGraphModule {

}
