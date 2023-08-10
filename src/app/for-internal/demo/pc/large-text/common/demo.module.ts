import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawLargeTextModule,
    JigsawBoxModule,
    JigsawButtonModule,
    JigsawHeaderModule,
    JigsawIconModule,
    JigsawInputModule, JigsawNumericInputModule, JigsawColorSelectModule, JigsawSwitchModule, JigsawRadioLiteModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {LargeTextCommonDemoComponent} from "./demo.component";

@NgModule({
    declarations: [LargeTextCommonDemoComponent],
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawLargeTextModule, JigsawButtonModule, JigsawColorSelectModule, JigsawRadioLiteModule,
        JigsawBoxModule, JigsawHeaderModule, JigsawIconModule, JigsawInputModule, JigsawNumericInputModule, JigsawSwitchModule
    ],
    exports: [LargeTextCommonDemoComponent]
})
export class LargeTextCommonDemoModule {
}
