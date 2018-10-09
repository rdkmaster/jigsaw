import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {uploadDemoComponent} from "./demo.component";
import {JigsawUploadModule} from "jigsaw/component/upload/index";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import {JigsawRadioLiteModule} from "jigsaw/component/radio/radio-lite";

@NgModule({
    declarations: [uploadDemoComponent],
    exports: [ uploadDemoComponent ],
    imports: [JigsawUploadModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawRadioLiteModule]
})
export class UploadBasicDemoModule{

}
