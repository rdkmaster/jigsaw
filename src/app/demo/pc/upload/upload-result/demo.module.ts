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
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

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
        JigsawButtonModule,
        DemoTemplateModule
    ]
})
export class UploadResultDemoModule {}
