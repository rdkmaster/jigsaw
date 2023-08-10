import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawLargeTextModule,
    JigsawBoxModule,
    JigsawButtonModule,
    JigsawHeaderModule,
    JigsawIconModule,
    JigsawInputModule, JigsawNumericInputModule, JigsawSwitchModule, JigsawRadioLiteModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {LargeTextTrendDemoComponent} from "./demo.component";

@NgModule({
    declarations: [LargeTextTrendDemoComponent],
    imports: [
        CommonModule,JigsawDemoDescriptionModule, JigsawLargeTextModule, JigsawButtonModule,JigsawSwitchModule,
        JigsawBoxModule, JigsawHeaderModule, JigsawIconModule, JigsawInputModule, JigsawNumericInputModule,JigsawRadioLiteModule
    ],
    exports: [LargeTextTrendDemoComponent]
})
export class LargeTextTrendDemoModule {
}
