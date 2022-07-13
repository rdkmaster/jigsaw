import {NgModule} from "@angular/core";
import {JigsawColorSelectModule, JigsawInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ColorSelectBasicDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [ColorSelectBasicDemoComponent],
    imports: [
        JigsawColorSelectModule, JigsawDemoDescriptionModule, JigsawInputModule, DemoTemplateModule
    ],
    exports: [ColorSelectBasicDemoComponent]
})
export class ColorSelectBasicDemoModule {
}
