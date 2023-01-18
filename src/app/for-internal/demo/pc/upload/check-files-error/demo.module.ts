import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawUploadModule, JigsawSwitchModule, JigsawRadioLiteModule, JigsawButtonModule,
    JigsawLoadingModule, JigsawNumericInputModule, JigsawHeaderModule, JigsawButtonBarModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {UploadDirectiveErrorDemoComponent} from "./demo.component";

@NgModule({
    declarations: [UploadDirectiveErrorDemoComponent],
    exports: [UploadDirectiveErrorDemoComponent],
    imports: [JigsawUploadModule, JigsawDemoDescriptionModule, JigsawSwitchModule,
        JigsawRadioLiteModule, JigsawButtonModule, JigsawLoadingModule, CommonModule,
        JigsawNumericInputModule, JigsawHeaderModule, JigsawButtonBarModule]
})
export class UploadDirectiveErrorDemoModule {

}
