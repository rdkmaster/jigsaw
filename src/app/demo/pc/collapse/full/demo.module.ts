import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawCollapseModule} from "jigsaw/pc-components/collapse/collapse";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {JigsawGraphModule} from "jigsaw/pc-components/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CollapseFullComponent} from "./demo.component";

@NgModule({
    declarations: [CollapseFullComponent],
    exports: [CollapseFullComponent],
    imports: [
        CommonModule, JigsawCollapseModule, JigsawButtonModule, JigsawInputModule,
        JigsawTableModule, JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class CollapseFullModule {

}
