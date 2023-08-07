import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawLargeTextModule, JigsawBoxModule, JigsawButtonModule, JigsawHeaderModule, JigsawIconModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {LargeTextCommonDemoComponent} from "./demo.component";

@NgModule({
    declarations: [LargeTextCommonDemoComponent],
    imports: [
        CommonModule,JigsawDemoDescriptionModule, JigsawLargeTextModule, JigsawButtonModule,
        JigsawBoxModule, JigsawHeaderModule, JigsawIconModule
    ],
    exports: [LargeTextCommonDemoComponent]
})
export class LargeTextCommonDemoModule {
}
