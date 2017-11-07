import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/component/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {GraphWithNoDataComponent} from "./app.component";

@NgModule({
    declarations: [GraphWithNoDataComponent],
    bootstrap: [GraphWithNoDataComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class GraphWithNoDataModule {

}
