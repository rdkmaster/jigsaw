import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRadioModule} from "jigsaw/public_api";
import {RadioComplexSceneComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [RadioComplexSceneComponent],
    exports: [RadioComplexSceneComponent],
    imports: [JigsawRadioModule, CommonModule, DemoTemplateModule]
})
export class RadioComplexSceneDemoModule {

}
