import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/pc-components/graph/index";
import {MapGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [MapGraphComponent],
    exports: [MapGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class MapGraphModule {

}
