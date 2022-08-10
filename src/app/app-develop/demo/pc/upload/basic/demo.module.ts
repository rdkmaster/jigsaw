import { NgModule } from "@angular/core";
import { JigsawUploadModule, JigsawHeaderModule, JigsawRadioLiteModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/app-develop/demo-description/demo-description";
import { UploadBasicDemoComponent } from "./demo.component";

@NgModule({
    declarations: [UploadBasicDemoComponent],
    exports: [UploadBasicDemoComponent],
    imports: [JigsawUploadModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawRadioLiteModule]
})
export class UploadBasicDemoModule {

}
