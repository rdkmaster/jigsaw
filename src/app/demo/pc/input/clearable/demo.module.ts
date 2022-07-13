import {NgModule} from "@angular/core";
import {JigsawInputModule, JigsawSwitchModule} from "jigsaw/public_api";
import {InputClearableDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [InputClearableDemoComponent],
    exports: [InputClearableDemoComponent],
    imports: [JigsawInputModule, JigsawSwitchModule, DemoTemplateModule]
})
export class InputClearableDemoModule {

}
