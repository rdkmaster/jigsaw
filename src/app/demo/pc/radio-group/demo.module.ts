import { NgModule } from "@angular/core";
import {RadioAllComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";

import {DemoTemplateModule} from "../../demo-template/demo-template";
import {JigsawInputModule} from "../../../../jigsaw/pc-components/input/input";
import {RadioBasicComponent} from "./basic/demo.component";
import {JigsawRadioModule} from "../../../../jigsaw/pc-components/radio/radios";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule} from "../../../../jigsaw/pc-components/button/button";
import {RadioDataIsObjectComponent} from "./object/demo.component";
import {RadioDataIsStringArrayComponent} from "./string-array/demo.component";
import {RadioComplexSceneComponent} from "./complex-scene/demo.component";


@NgModule({
    imports: [JigsawMarkdownModule, DemoTemplateModule, JigsawInputModule, JigsawRadioModule, CommonModule, JigsawButtonModule],
    declarations: [
        RadioAllComponent,
        RadioBasicComponent,
        RadioDataIsObjectComponent,
        RadioDataIsStringArrayComponent,
        RadioComplexSceneComponent
    ],
    exports: [RadioAllComponent]
})
export class RadioAllModule {}
