import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawMobileRadioModule, JigsawMobileButtonModule, JigsawFloatModule, JigsawMobileInputModule,
    JigsawMobileSwitchModule, JigsawTrustedHtmlModule
} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
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
