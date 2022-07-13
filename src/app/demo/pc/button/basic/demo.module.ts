import {NgModule} from "@angular/core";
import {JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ButtonBasicDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [ButtonBasicDemoComponent],
    exports: [ ButtonBasicDemoComponent ],
    imports: [JigsawButtonModule, JigsawDemoDescriptionModule, DemoTemplateModule]
})
export class ButtonBasicDemoModule {

}
