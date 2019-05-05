import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/pc-components/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {GraphWithNoDataComponent} from "./demo.component";

@NgModule({
    declarations: [GraphWithNoDataComponent],
    exports: [GraphWithNoDataComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class GraphWithNoDataModule {

}
