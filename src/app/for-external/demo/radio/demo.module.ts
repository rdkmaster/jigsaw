import { NgModule } from "@angular/core";
import { RadioGroupDemoComponent } from "./demo.component";
import { DemoTemplateModule } from "../../demo-template/demo-template";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { JigsawButtonModule, JigsawRadioModule, JigsawHeaderModule, JigsawRadioLiteModule } from "jigsaw/public_api";
import { CommonModule } from "@angular/common";
import { RadioDataIsStringArrayComponent } from "./string-array/demo.component";
import { RadioDataIsObjectComponent } from "./object/demo.component";
import { RadioComplexSceneComponent } from "./complex-scene/demo.component";
import { RadioTrackItemByDemoComponent } from "./track-item-by/demo.component";
import { RadioLiteComponent } from "./radio-lite/demo.component";

@NgModule({
    declarations: [RadioGroupDemoComponent, RadioDataIsStringArrayComponent, RadioDataIsObjectComponent, RadioComplexSceneComponent,
        RadioTrackItemByDemoComponent, RadioLiteComponent],
    imports: [
        DemoTemplateModule, JigsawMarkdownModule, JigsawRadioModule, JigsawButtonModule, CommonModule,
        JigsawHeaderModule, JigsawRadioLiteModule
    ]
})
export class RadioGroupDemoModule {
}
