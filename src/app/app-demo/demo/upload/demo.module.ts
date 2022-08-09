import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../../demo-template/demo-template';
import { JigsawMarkdownModule } from '../../../markdown/markdown';
import { UploadAllComponent } from "./demo.component";
import { JigsawUploadModule, JigsawRadioLiteModule, JigsawButtonModule, JigsawButtonBarModule, JigsawLoadingModule, JigsawInputModule } from "jigsaw/public_api";
import {UploadBasicDemoComponent} from "./basic/demo.component";
import {UploadSingleDemoComponent} from "./single/demo.component";
import {UploadHideResultsDemoComponent} from "./hide-results/demo.component";
import {UploadProfileTypeDemoComponent} from "./profile-type/demo.component";
import {UploadManualUploadDemoComponent} from "./manual-upload/demo.component";
import {UploadManualClearDemoComponent} from "./manual-clear/demo.component";
import {UploadSetSizeDemoComponent} from "./set-size/demo.component";
import {ChangeTargetUrlDemoComponent} from "./change-target-url/demo.component";
import {UploadDirectiveDemoComponent} from "./directive/demo.component";
import {UploadAutoUploadDemoComponent} from "./toggle-auto-upload/demo.component";
import {UploadContentFieldDemoComponent} from "./content-field/demo.component";
import {CommonModule} from "@angular/common";


@NgModule({
    declarations: [
        UploadAllComponent,
        UploadBasicDemoComponent,
        UploadSingleDemoComponent,
        UploadHideResultsDemoComponent,
        UploadProfileTypeDemoComponent,
        UploadManualUploadDemoComponent,
        UploadManualClearDemoComponent,
        UploadSetSizeDemoComponent,
        ChangeTargetUrlDemoComponent,
        UploadDirectiveDemoComponent,
        UploadAutoUploadDemoComponent,
        UploadContentFieldDemoComponent

    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawUploadModule,
        JigsawRadioLiteModule,
        JigsawButtonModule,
        JigsawButtonBarModule,
        JigsawLoadingModule,
        JigsawInputModule,
        CommonModule
    ]
})
export class UploadDemoModule {
}
