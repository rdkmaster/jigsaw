import {NgModule} from "@angular/core";
import {JigsawGraphModule, JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {RectangularGraphDemoComponent} from "./demo.component";

@NgModule({
    declarations: [RectangularGraphDemoComponent],
    exports: [RectangularGraphDemoComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawHeaderModule]
})
export class RectangularGraphDemoModule {

}
