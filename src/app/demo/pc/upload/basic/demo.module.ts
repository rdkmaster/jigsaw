import { NgModule } from "@angular/core";
import { JigsawUploadModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { UploadBasicDemoComponent } from "./demo.component";

@NgModule({
    declarations: [UploadBasicDemoComponent],
    exports: [UploadBasicDemoComponent],
    imports: [JigsawUploadModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class UploadBasicDemoModule {

}
