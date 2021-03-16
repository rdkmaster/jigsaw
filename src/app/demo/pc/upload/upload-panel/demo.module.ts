import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawUploadModule, JigsawHeaderModule, JigsawRadioLiteModule, JigsawSwitchModule, JigsawNumericInputModule } from "jigsaw/public_api";
import { UploadPanelDemoComponent } from "./demo.component";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";

@NgModule({
    declarations: [UploadPanelDemoComponent],
    exports: [UploadPanelDemoComponent],
    imports: [
        JigsawUploadModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule,
        CommonModule,
        JigsawRadioLiteModule,
        JigsawSwitchModule,
        JigsawNumericInputModule
    ]
})
export class UploadPanelDemoModule {}
