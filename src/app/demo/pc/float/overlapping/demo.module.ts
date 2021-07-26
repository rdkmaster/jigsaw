import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawRadioModule, JigsawButtonModule, JigsawFloatModule, JigsawComboSelectModule,
    JigsawNumericInputModule, JigsawInputModule, JigsawSwitchModule,
    JigsawTrustedHtmlModule, JigsawMenuModule, JigsawAutoCompleteInputModule,
    LoadingService
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {FloatOverlappingDemo} from "./demo.component";

@NgModule({
    declarations: [FloatOverlappingDemo],
    exports: [FloatOverlappingDemo],
    imports: [
        JigsawFloatModule, JigsawRadioModule, JigsawSwitchModule, JigsawTrustedHtmlModule,
        JigsawDemoDescriptionModule, JigsawButtonModule, CommonModule, JigsawNumericInputModule,
        JigsawInputModule, JigsawAutoCompleteInputModule, JigsawComboSelectModule, JigsawMenuModule
    ],
    providers: [LoadingService]
})
export class FloatOverlappingDemoModule {
}
