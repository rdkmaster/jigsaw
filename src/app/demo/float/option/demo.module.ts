import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawRadioModule} from "jigsaw/pc-components/radio/radio";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawFloatModule} from "jigsaw/common/directive/float";
import {JigsawNumericInputModule} from "jigsaw/pc-components/input/numeric-input";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {JigsawSwitchModule} from "jigsaw/pc-components/switch";
import {JigsawTrustedHtmlModule} from "jigsaw/common/directive/trusted-html/trusted-html";
import {FloatOptionDemo} from "./demo.component";


@NgModule({
    declarations: [FloatOptionDemo],
    exports: [FloatOptionDemo],
    imports: [
        JigsawFloatModule, JigsawRadioModule, JigsawSwitchModule, JigsawTrustedHtmlModule,
        JigsawDemoDescriptionModule, JigsawButtonModule, CommonModule, JigsawNumericInputModule,
        JigsawInputModule
    ]
})
export class FloatOptionDemoModule {
}
