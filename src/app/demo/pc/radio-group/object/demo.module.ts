import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRadioModule} from "jigsaw/public_api";
import {RadioDataIsObjectComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [RadioDataIsObjectComponent],
    exports: [RadioDataIsObjectComponent],
    imports: [JigsawRadioModule, CommonModule, DemoTemplateModule]
})
export class RadioDataIsObjectDemoModule {

}
