import {NgModule} from "@angular/core";
import {JigsawCheckBoxModule, JigsawSwitchModule} from "jigsaw/public_api";
import {CheckboxDisabledComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [CheckboxDisabledComponent],
    exports: [CheckboxDisabledComponent],
    imports: [JigsawCheckBoxModule, JigsawSwitchModule, DemoTemplateModule]
})
export class CheckboxDisabledDemoModule {
}
