import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputValidComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [InputValidComponent],
    exports: [InputValidComponent],
    imports: [JigsawInputModule, JigsawDemoDescriptionModule, DemoTemplateModule]
})
export class InputValidModule {
}
