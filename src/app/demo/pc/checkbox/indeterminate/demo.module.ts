import {NgModule} from "@angular/core";
import {JigsawCheckBoxModule} from "jigsaw/public_api";
import {CheckboxIndeterminateComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [CheckboxIndeterminateComponent],
    exports: [CheckboxIndeterminateComponent],
    imports: [JigsawCheckBoxModule, DemoTemplateModule]
})
export class CheckboxIndeterminateDemoModule {
}
