import {NgModule} from "@angular/core";
import {RadioGroupDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {JigsawRadioModule} from "../../../../jigsaw/pc-components/radio/radios";
import {JigsawButtonModule} from "../../../../jigsaw/pc-components/button/button";
import {CommonModule} from "@angular/common";
import {RadioDataIsStringArrayComponent} from "./string-array/demo.component";
import {RadioDataIsObjectComponent} from "./object/demo.component";
import {RadioComplexSceneComponent} from "./complex-scene/demo.component";
import {RadioTrackItemByDemoComponent} from "./track-item-by/demo.component";
import {JigsawDemoDescriptionModule} from "../../../demo-description/demo-description";
@NgModule({
    declarations: [ RadioGroupDemoComponent , RadioDataIsStringArrayComponent, RadioDataIsObjectComponent, RadioComplexSceneComponent,
        RadioTrackItemByDemoComponent],
    imports: [
        DemoTemplateModule, JigsawMarkdownModule, JigsawRadioModule, JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule
    ]
})
export  class RadioGroupDemoModule {
}
