import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawFloatModule} from "jigsaw/directive/float";
import {JigsawNumericInputModule} from "jigsaw/component/input/numeric-input";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawSwitchModule} from "jigsaw/component/switch";
import {JigsawTrustedHtmlModule} from "jigsaw/directive/trusted-html/trusted-html";
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
