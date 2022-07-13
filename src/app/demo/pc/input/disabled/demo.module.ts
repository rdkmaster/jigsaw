import {NgModule} from "@angular/core";
import {JigsawInputModule, JigsawSwitchModule} from "jigsaw/public_api";
import {InputDisabledComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [InputDisabledComponent],
    exports: [InputDisabledComponent],
    imports: [JigsawInputModule, JigsawSwitchModule, DemoTemplateModule]
})
export class InputDisabledModule {
}
