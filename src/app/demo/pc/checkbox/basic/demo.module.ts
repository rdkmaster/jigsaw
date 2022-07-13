import {NgModule} from "@angular/core";
import {JigsawCheckBoxModule, JigsawSwitchModule} from "jigsaw/public_api";
import {CheckboxBasicComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [CheckboxBasicComponent],
    exports: [CheckboxBasicComponent],
    imports: [JigsawCheckBoxModule, JigsawSwitchModule, DemoTemplateModule]
})
export class CheckBoxBasicDemoModule {
}
