import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRadioModule} from "jigsaw/public_api";
import {RadioDataIsStringArrayComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [RadioDataIsStringArrayComponent],
    exports: [RadioDataIsStringArrayComponent],
    imports: [JigsawRadioModule, CommonModule, DemoTemplateModule]
})
export class RadioDataIsStringArrayDemoModule {

}
