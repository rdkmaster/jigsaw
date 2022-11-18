import { NgModule } from "@angular/core";
import { JigsawUploadModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { UploadGetFileUrlsComponent } from "./demo.component";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [UploadGetFileUrlsComponent],
    exports: [UploadGetFileUrlsComponent],
    imports: [JigsawUploadModule, JigsawDemoDescriptionModule, JigsawHeaderModule, CommonModule]
})
export class UploadGetFileUrlsModule {

}
