import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule, JigsawRadioModule} from "jigsaw/public_api";
import {RadioBasicComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [RadioBasicComponent],
    exports: [RadioBasicComponent],
    imports: [JigsawRadioModule, CommonModule, JigsawButtonModule, DemoTemplateModule]
})
export class RadioBasicDemoModule {

}
