import {NgModule} from "@angular/core";
import {JigsawGraphModule, JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {LineGraphComponent} from "./demo.component";

@NgModule({
    declarations: [LineGraphComponent],
    exports: [LineGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class LineGraphModule {

}
