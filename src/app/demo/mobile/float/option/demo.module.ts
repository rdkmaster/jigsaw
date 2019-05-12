import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawMobileRadioModule} from "jigsaw/mobile-components/radio/radio";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawFloatModule} from "jigsaw/common/directive/float";
import {JigsawMobileInputModule} from "jigsaw/mobile-components/input/input";
import {JigsawMobileSwitchModule} from "jigsaw/mobile-components/switch";
import {JigsawTrustedHtmlModule} from "jigsaw/common/directive/trusted-html/trusted-html";
import {FloatOptionDemo} from "./demo.component";


@NgModule({
    declarations: [FloatOptionDemo],
    exports: [FloatOptionDemo],
    imports: [
        JigsawFloatModule, JigsawMobileRadioModule, JigsawMobileSwitchModule, JigsawTrustedHtmlModule,
        JigsawDemoDescriptionModule, JigsawMobileButtonModule, CommonModule,
        JigsawMobileInputModule
    ]
})
export class FloatOptionDemoModule {
}
