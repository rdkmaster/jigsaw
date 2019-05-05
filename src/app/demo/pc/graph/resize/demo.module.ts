import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/pc-components/graph/index";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {JigsawSwitchModule} from "jigsaw/pc-components/switch/index";
import {GraphResizeComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [GraphResizeComponent],
    exports: [GraphResizeComponent],
    imports: [JigsawGraphModule, JigsawInputModule, JigsawSwitchModule, JigsawDemoDescriptionModule]
})
export class GraphResizeModule {

}
