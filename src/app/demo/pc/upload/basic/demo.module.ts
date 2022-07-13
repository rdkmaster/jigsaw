import { NgModule } from "@angular/core";
import { JigsawUploadModule, JigsawHeaderModule, JigsawRadioLiteModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { UploadBasicDemoComponent } from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [UploadBasicDemoComponent],
    exports: [UploadBasicDemoComponent],
    imports: [JigsawUploadModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawRadioLiteModule, DemoTemplateModule]
})
export class UploadBasicDemoModule {

}
