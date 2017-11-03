import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CollapseFullComponent} from "./app.component";
import {JigsawCollapseModule} from "jigsaw/component/collapse/collapse";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawGraphModule} from "jigsaw/component/graph/index";

@NgModule({
    declarations: [CollapseFullComponent],
    bootstrap: [CollapseFullComponent],
    imports: [CommonModule, JigsawCollapseModule, JigsawButtonModule, JigsawInputModule, JigsawTableModule, JigsawGraphModule]
})
export class CollapseFullModule {

}
