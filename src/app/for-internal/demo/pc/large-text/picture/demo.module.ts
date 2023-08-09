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
import {LargeTextPictureDemoComponent} from "./demo.component";

@NgModule({
    declarations: [LargeTextPictureDemoComponent],
    imports: [
        CommonModule,JigsawDemoDescriptionModule, JigsawLargeTextModule, JigsawButtonModule,
        JigsawBoxModule, JigsawHeaderModule, JigsawIconModule, JigsawInputModule, JigsawNumericInputModule
    ],
    exports: [LargeTextPictureDemoComponent]
})
export class LargeTextPictureDemoModule {
}
