import {NgModule} from "@angular/core";
import {JigsawGraphModule, JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {PieGraphDemoComponent} from "./demo.component";

@NgModule({
    declarations: [PieGraphDemoComponent],
    exports: [PieGraphDemoComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class PieGraphDemoModule {

}
