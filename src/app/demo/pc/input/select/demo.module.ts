import {NgModule} from "@angular/core";
import {JigsawInputModule, JigsawCheckBoxModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputSelectDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [InputSelectDemoComponent],
    exports: [InputSelectDemoComponent],
    imports: [JigsawInputModule, JigsawCheckBoxModule, JigsawDemoDescriptionModule, DemoTemplateModule]
})
export class InputSelectDemoModule {

}
