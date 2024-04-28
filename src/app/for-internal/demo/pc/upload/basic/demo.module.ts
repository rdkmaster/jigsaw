import { NgModule } from "@angular/core";
import { JigsawUploadModule, JigsawHeaderModule, JigsawRadioLiteModule, JigsawSwitchModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { UploadBasicDemoComponent } from "./demo.component";

@NgModule({
    declarations: [UploadBasicDemoComponent],
    exports: [UploadBasicDemoComponent],
    imports: [JigsawUploadModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawRadioLiteModule, JigsawSwitchModule]
})
export class UploadBasicDemoModule {

}
