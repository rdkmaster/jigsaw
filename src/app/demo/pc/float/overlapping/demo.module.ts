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
import {FloatOverlappingDemo} from "./demo.component";
import {JigsawAutoCompleteInputModule} from "jigsaw/pc-components/input/auto-complete-input";
import {LoadingService} from "jigsaw/common/service/loading.service";
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select";


@NgModule({
    declarations: [FloatOverlappingDemo],
    exports: [FloatOverlappingDemo],
    imports: [
        JigsawFloatModule, JigsawRadioModule, JigsawSwitchModule, JigsawTrustedHtmlModule,
        JigsawDemoDescriptionModule, JigsawButtonModule, CommonModule, JigsawNumericInputModule,
        JigsawInputModule, JigsawAutoCompleteInputModule, JigsawComboSelectModule
    ],
    providers: [LoadingService]
})
export class FloatOverlappingDemoModule {
}
