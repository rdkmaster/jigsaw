import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawLargeTextModule,
    JigsawBoxModule,
    JigsawButtonModule,
    JigsawHeaderModule,
    JigsawIconModule,
    JigsawInputModule, JigsawNumericInputModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {LargeTextTrendDemoComponent} from "./demo.component";

@NgModule({
    declarations: [LargeTextTrendDemoComponent],
    imports: [
        CommonModule,JigsawDemoDescriptionModule, JigsawLargeTextModule, JigsawButtonModule,
        JigsawBoxModule, JigsawHeaderModule, JigsawIconModule, JigsawInputModule, JigsawNumericInputModule
    ],
    exports: [LargeTextTrendDemoComponent]
})
export class LargeTextTrendDemoModule {
}
