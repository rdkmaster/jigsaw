import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawUploadFallbackModule, JigsawSwitchModule, JigsawRadioLiteModule, JigsawButtonModule,
    JigsawLoadingModule, JigsawNumericInputModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {UploadBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [UploadBasicDemoComponent],
    exports: [UploadBasicDemoComponent],
    imports: [JigsawUploadFallbackModule, JigsawDemoDescriptionModule, JigsawSwitchModule,
        JigsawRadioLiteModule, JigsawButtonModule, JigsawLoadingModule, CommonModule, JigsawNumericInputModule]
})
export class UploadBasicDemoModule {

}
