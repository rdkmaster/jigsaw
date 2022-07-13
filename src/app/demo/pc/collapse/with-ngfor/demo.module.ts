import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawCollapseModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CollapseWithNGForDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [CollapseWithNGForDemoComponent],
    exports: [CollapseWithNGForDemoComponent],
    imports: [CommonModule, JigsawCollapseModule, JigsawButtonModule, JigsawDemoDescriptionModule, DemoTemplateModule]
})
export class ngForDemoModule {

}
