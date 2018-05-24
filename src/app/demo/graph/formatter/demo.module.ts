import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/component/graph/index";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import {GraphFormatterComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [GraphFormatterComponent],
    exports: [GraphFormatterComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class GraphFormatterModule {

}
