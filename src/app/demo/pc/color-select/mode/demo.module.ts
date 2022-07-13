import {NgModule} from "@angular/core";
import {JigsawColorSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ColorSelectModeDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [ColorSelectModeDemoComponent],
    imports: [
        JigsawColorSelectModule, JigsawDemoDescriptionModule
    , JigsawHeaderModule, DemoTemplateModule],
    exports: [ColorSelectModeDemoComponent]
})
export class ColorSelectModeDemoModule {
}
