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
import {FloatComplexDemo} from "./demo.component";
import {JigsawAutoCompleteInputModule} from "jigsaw/component/input/auto-complete-input";
import {LoadingService} from "jigsaw/service/loading.service";


@NgModule({
    declarations: [FloatComplexDemo],
    exports: [FloatComplexDemo],
    imports: [
        JigsawFloatModule, JigsawRadioModule, JigsawSwitchModule, JigsawTrustedHtmlModule,
        JigsawDemoDescriptionModule, JigsawButtonModule, CommonModule, JigsawNumericInputModule,
        JigsawInputModule, JigsawAutoCompleteInputModule
    ],
    providers: [LoadingService]
})
export class FloatComplexDemoModule {
}
