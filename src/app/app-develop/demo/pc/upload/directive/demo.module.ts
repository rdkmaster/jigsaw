import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawUploadModule, JigsawSwitchModule, JigsawRadioLiteModule, JigsawButtonModule,
    JigsawLoadingModule, JigsawNumericInputModule, JigsawHeaderModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {UploadDirectiveDemoComponent} from "./demo.component";

@NgModule({
    declarations: [UploadDirectiveDemoComponent],
    exports: [UploadDirectiveDemoComponent],
    imports: [JigsawUploadModule, JigsawDemoDescriptionModule, JigsawSwitchModule,
        JigsawRadioLiteModule, JigsawButtonModule, JigsawLoadingModule, CommonModule,
        JigsawNumericInputModule, JigsawHeaderModule]
})
export class UploadDirectiveDemoModule {

}
