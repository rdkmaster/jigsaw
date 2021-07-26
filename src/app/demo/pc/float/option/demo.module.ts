import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawRadioModule, JigsawButtonModule, JigsawFloatModule, JigsawNumericInputModule,
    JigsawInputModule, JigsawSwitchModule, JigsawTrustedHtmlModule, JigsawSelectModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {FloatOptionDemo} from "./demo.component";

@NgModule({
    declarations: [FloatOptionDemo],
    exports: [FloatOptionDemo],
    imports: [
        JigsawFloatModule, JigsawRadioModule, JigsawSwitchModule, JigsawTrustedHtmlModule,
        JigsawDemoDescriptionModule, JigsawButtonModule, CommonModule, JigsawNumericInputModule,
        JigsawInputModule, JigsawSelectModule
    ]
})
export class FloatOptionDemoModule {
}
