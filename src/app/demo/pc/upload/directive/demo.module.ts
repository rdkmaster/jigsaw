import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawUploadModule, JigsawSwitchModule, JigsawRadioLiteModule, JigsawButtonModule,
    JigsawLoadingModule, JigsawNumericInputModule, JigsawHeaderModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {UploadDirectiveDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [UploadDirectiveDemoComponent],
    exports: [UploadDirectiveDemoComponent],
    imports: [JigsawUploadModule, JigsawDemoDescriptionModule, JigsawSwitchModule,
        JigsawRadioLiteModule, JigsawButtonModule, JigsawLoadingModule, CommonModule,
        JigsawNumericInputModule, JigsawHeaderModule, DemoTemplateModule]
})
export class UploadDirectiveDemoModule {

}
