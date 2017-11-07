import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawCollapseModule} from "jigsaw/component/collapse/collapse";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawGraphModule} from "jigsaw/component/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CollapseFullComponent} from "./app.component";

@NgModule({
    declarations: [CollapseFullComponent],
    bootstrap: [CollapseFullComponent],
    imports: [
        CommonModule, JigsawCollapseModule, JigsawButtonModule, JigsawInputModule,
        JigsawTableModule, JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class CollapseFullModule {

}
