import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonWidthHeightDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [ButtonWidthHeightDemoComponent],
    exports: [ButtonWidthHeightDemoComponent],
    imports: [JigsawButtonModule, JigsawDemoDescriptionModule, DemoTemplateModule]
})
export class ButtonWidthHeightDemoModule {

}
