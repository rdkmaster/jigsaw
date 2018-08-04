import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {uploadDemoComponent} from "./demo.component";
import {JigsawUploadModule} from "jigsaw/component/upload/upload";

@NgModule({
    declarations: [uploadDemoComponent],
    exports: [ uploadDemoComponent ],
    imports: [JigsawUploadModule, JigsawDemoDescriptionModule]
})
export class UploadBasicDemoModule{

}
