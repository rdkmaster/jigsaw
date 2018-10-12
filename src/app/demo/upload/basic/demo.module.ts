import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {uploadDemoComponent} from "./demo.component";
import {JigsawUploadModule} from "jigsaw/component/upload/index";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import {JigsawRadioLiteModule} from "jigsaw/component/radio/radio-lite";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawLoadingModule} from "jigsaw/component/loading/loading";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [uploadDemoComponent],
    exports: [ uploadDemoComponent ],
    imports: [JigsawUploadModule, JigsawDemoDescriptionModule, JigsawSwitchModule,
        JigsawRadioLiteModule, JigsawButtonModule, JigsawLoadingModule, CommonModule]
})
export class UploadBasicDemoModule{

}
