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
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

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
        JigsawButtonBarModule,
        DemoTemplateModule
    ]
})
export class UploadAutoUploadDemoModule {}
