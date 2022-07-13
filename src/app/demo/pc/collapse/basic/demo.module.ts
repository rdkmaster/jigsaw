import {NgModule} from "@angular/core";
import {JigsawCollapseModule, JigsawInputModule, JigsawButtonModule, JigsawButtonBarModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CollapseBasicDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [CollapseBasicDemoComponent],
    exports: [CollapseBasicDemoComponent],
    imports: [JigsawCollapseModule, JigsawInputModule, JigsawDemoDescriptionModule, JigsawButtonModule, JigsawButtonBarModule, DemoTemplateModule]
})
export class CollapseBasicDemoModule {

}
