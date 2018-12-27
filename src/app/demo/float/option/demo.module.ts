import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";

import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";
import {CommonModule} from "@angular/common";
import {JigsawFloatModule} from "../../../../jigsaw/directive/float";
import {FloatOptionDemo} from "./demo.component";
import {JigsawNumericInputModule} from "../../../../jigsaw/component/input/numeric-input";
import {JigsawInputModule} from "../../../../jigsaw/component/input/input";
import {JigsawSwitchModule} from "../../../../jigsaw/component/switch";


@NgModule({
    declarations: [FloatOptionDemo],
    exports: [FloatOptionDemo],
    imports: [
        JigsawFloatModule, JigsawRadioModule, JigsawSwitchModule,
        JigsawDemoDescriptionModule, JigsawButtonModule, CommonModule, JigsawNumericInputModule, JigsawInputModule
    ]
})
export class FloatOptionDemoModule {
}
