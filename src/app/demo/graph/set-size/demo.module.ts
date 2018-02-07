import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/component/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {GraphSetSizeComponent} from "./demo.component";

@NgModule({
    declarations: [GraphSetSizeComponent],
    exports: [GraphSetSizeComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class GraphSetSizeModule {

}
