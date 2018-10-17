import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawBoxModule} from "../box";
import {JigsawButtonModule} from "../button/button";
import {JigsawDraggableModule, JigsawDroppableModule} from "../../directive/dragdrop";
import {JigsawUploadFileInfoList, JigsawUploadDirective} from "./upload.directive";
import {JigsawUpload} from "./upload";
import {PopupService} from "../../service/popup.service";

@NgModule({
    imports: [
        JigsawBoxModule, JigsawButtonModule, PerfectScrollbarModule, JigsawDraggableModule,
        JigsawDroppableModule, CommonModule, FormsModule
    ],
    declarations: [JigsawUpload, JigsawUploadDirective, JigsawUploadFileInfoList],
    exports: [JigsawUpload, JigsawUploadDirective],
    entryComponents: [JigsawUploadFileInfoList],
    providers: [PopupService, TranslateService],
})
export class JigsawUploadModule {

}

export * from './upload';
export * from './upload.base';
export * from './upload.directive';
