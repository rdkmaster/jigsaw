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
import { ChangeTargetUrlDemoComponent } from "./demo.component";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [ChangeTargetUrlDemoComponent],
    exports: [ChangeTargetUrlDemoComponent],
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
export class UploadChangeTargetUrlDemoModule {}
