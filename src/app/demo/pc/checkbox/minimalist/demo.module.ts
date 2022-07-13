import {NgModule} from "@angular/core";
import {JigsawButtonBarModule, JigsawCheckBoxModule} from "jigsaw/public_api";
import {CheckboxMinimalistComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [CheckboxMinimalistComponent],
    exports: [CheckboxMinimalistComponent],
    imports: [JigsawCheckBoxModule, DemoTemplateModule, JigsawButtonBarModule]
})
export class CheckboxMinimalistDemoModule {
}
