import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonColorDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [ButtonColorDemoComponent],
    exports: [ButtonColorDemoComponent],
    imports: [JigsawButtonModule, JigsawDemoDescriptionModule, JigsawHeaderModule, DemoTemplateModule]
})
export class ButtonColorDemoModule {

}
