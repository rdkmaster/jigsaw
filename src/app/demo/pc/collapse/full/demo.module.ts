import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawCollapseModule, JigsawButtonModule, JigsawInputModule, JigsawTableModule,
    JigsawGraphModule
} from "jigsaw/public_api";
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
