import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    JigsawUploadModule,
    JigsawHeaderModule,
    JigsawRadioLiteModule,
    JigsawSwitchModule,
    JigsawNumericInputModule,
    JigsawButtonModule
} from "jigsaw/public_api";
import { UploadResultDemoComponent } from "./demo.component";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";

@NgModule({
    declarations: [UploadResultDemoComponent],
    exports: [UploadResultDemoComponent],
    imports: [
        JigsawUploadModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule,
        CommonModule,
        JigsawRadioLiteModule,
        JigsawSwitchModule,
        JigsawNumericInputModule,
        JigsawButtonModule
    ]
})
export class UploadResultDemoModule {}
