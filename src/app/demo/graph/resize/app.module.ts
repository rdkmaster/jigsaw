import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/component/graph/index";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import {GraphResizeComponent} from "./app.component";
@NgModule({
    declarations: [GraphResizeComponent],
    bootstrap: [ GraphResizeComponent ],
    imports: [JigsawGraphModule,JigsawInputModule,JigsawSwitchModule]
})
export class GraphResizeModule{

}
