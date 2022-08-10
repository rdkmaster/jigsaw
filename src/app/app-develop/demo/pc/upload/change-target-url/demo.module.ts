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
import { JigsawDemoDescriptionModule } from "app/app-develop/demo-description/demo-description";

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
        JigsawButtonBarModule
    ]
})
export class UploadChangeTargetUrlDemoModule {}
