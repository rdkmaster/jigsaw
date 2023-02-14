import { NgModule } from "@angular/core";
import { JigsawUploadModule, JigsawHeaderModule, JigsawRadioLiteModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { UploadOfflineDemoComponent } from "./demo.component";

@NgModule({
    declarations: [UploadOfflineDemoComponent],
    exports: [UploadOfflineDemoComponent],
    imports: [JigsawUploadModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawRadioLiteModule]
})
export class UploadOfflineDemoModule {

}
