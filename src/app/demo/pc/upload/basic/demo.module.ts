import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {UploadBasicDemoComponent} from "./demo.component";
import {JigsawUploadModule} from "jigsaw/pc-components/upload/index";
import {JigsawSwitchModule} from "jigsaw/pc-components/switch/index";
import {JigsawRadioLiteModule} from "jigsaw/pc-components/radio/radio-lite";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawLoadingModule} from "jigsaw/common/components/loading/loading";
import {CommonModule} from "@angular/common";
import {JigsawNumericInputModule} from "jigsaw/pc-components/input/numeric-input";

@NgModule({
    declarations: [UploadBasicDemoComponent],
    exports: [UploadBasicDemoComponent],
    imports: [JigsawUploadModule, JigsawDemoDescriptionModule, JigsawSwitchModule,
        JigsawRadioLiteModule, JigsawButtonModule, JigsawLoadingModule, CommonModule, JigsawNumericInputModule]
})
export class UploadBasicDemoModule {

}
