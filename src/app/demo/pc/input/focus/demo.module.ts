import {NgModule} from "@angular/core";
import {JigsawInputModule, JigsawButtonModule} from "jigsaw/public_api";
import {InputFocusDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [InputFocusDemoComponent],
    exports: [InputFocusDemoComponent],
    imports: [JigsawInputModule, JigsawButtonModule, DemoTemplateModule]
})
export class InputFocusDemoModule {

}
