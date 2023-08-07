import {NgModule} from "@angular/core";
import {JigsawBigNumberModule, JigsawBoxModule, JigsawButtonModule, JigsawHeaderModule, JigsawIconModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {LargeTextCommonDemoComponent} from "./demo.component";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [LargeTextCommonDemoComponent],
    imports: [
        CommonModule,JigsawDemoDescriptionModule, JigsawBigNumberModule, JigsawButtonModule,
        JigsawBoxModule, JigsawHeaderModule, JigsawIconModule
    ],
    exports: [LargeTextCommonDemoComponent]
})
export class LargeTextCommonDemoModule {
}
