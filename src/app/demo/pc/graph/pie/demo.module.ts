import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/pc-components/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {PieGraphDemoComponent} from "./demo.component";

@NgModule({
    declarations: [PieGraphDemoComponent],
    exports: [PieGraphDemoComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class PieGraphDemoModule {

}
