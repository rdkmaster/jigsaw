import {NgModule} from "@angular/core";
import {GraphResizeComponent} from "./app.component";
import {JigsawGraphModule} from "../../../../jigsaw/component/graph/index";
import {JigsawInputModule} from "../../../../jigsaw/component/input/input";
import {JigsawSwitchModule} from "../../../../jigsaw/component/switch/index";
@NgModule({
    declarations: [GraphResizeComponent],
    imports: [JigsawGraphModule,JigsawInputModule,JigsawSwitchModule]
})
export class GraphResizeModule{

}
