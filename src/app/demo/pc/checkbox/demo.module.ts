import {NgModule} from "@angular/core";
import {CheckboxBasicComponent} from "./basic/demo.component";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {JigsawCheckBoxModule} from "../../../../jigsaw/pc-components/checkbox";
import {CheckBoxDemoComponent} from "./demo.componet";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {CheckboxMinimalistComponent} from "./minimalist/demo.component";
import {JigsawButtonBarModule} from "../../../../jigsaw/pc-components/list-and-tile/button-bar";
import {CheckboxCheckAllComponent} from "./checkall/demo.component";
@NgModule({
    declarations: [CheckboxBasicComponent, CheckBoxDemoComponent, CheckboxMinimalistComponent, CheckboxCheckAllComponent],
    imports: [
        DemoTemplateModule, JigsawCheckBoxModule, JigsawMarkdownModule, JigsawButtonBarModule
    ]
})
export class CheckBoxDemoModule {
}
