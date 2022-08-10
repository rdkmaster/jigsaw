import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    JigsawUploadModule,
    JigsawHeaderModule,
    JigsawRadioLiteModule,
    JigsawSwitchModule,
    JigsawNumericInputModule,
    JigsawButtonModule,
    JigsawButtonBarModule
} from "jigsaw/public_api";
import { UploadAutoUploadDemoComponent } from "./demo.component";
import { JigsawDemoDescriptionModule } from "app/app-develop/demo-description/demo-description";

@NgModule({
    declarations: [UploadAutoUploadDemoComponent],
    exports: [UploadAutoUploadDemoComponent],
    imports: [
        JigsawUploadModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule,
        CommonModule,
        JigsawRadioLiteModule,
        JigsawSwitchModule,
        JigsawNumericInputModule,
        JigsawButtonModule,
        JigsawButtonBarModule
    ]
})
export class UploadAutoUploadDemoModule {}
