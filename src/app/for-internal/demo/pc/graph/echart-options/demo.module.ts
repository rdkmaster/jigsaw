import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/public_api";
import {GraphEchartOptionsComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    declarations: [GraphEchartOptionsComponent],
    exports: [GraphEchartOptionsComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class GraphEchartOptionsModule {

}
