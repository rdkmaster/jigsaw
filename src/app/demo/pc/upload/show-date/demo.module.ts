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
import { UploadShowDateDemoComponent } from "./demo.component";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";

@NgModule({
    declarations: [UploadShowDateDemoComponent],
    exports: [UploadShowDateDemoComponent],
    imports: [
        JigsawUploadModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule,
        CommonModule,
        JigsawRadioLiteModule,
        JigsawSwitchModule,
        JigsawNumericInputModule,
        JigsawButtonModule,
        JigsawSwitchModule
    ]
})
export class UploadShowDateDemoModule {}
