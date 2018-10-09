import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {JigsawBoxModule} from "../box/index";
import {JigsawButtonModule} from "../button/button";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawDraggableModule, JigsawDroppableModule} from "../../directive/dragdrop/index";
import {FileInfoList, JigsawUploadDirective} from "./upload.directive";
import {JigsawUpload} from "./upload";
import {PopupService} from "../../service/popup.service";

@NgModule({
    imports: [JigsawBoxModule, JigsawButtonModule, PerfectScrollbarModule, JigsawDraggableModule,
        JigsawDroppableModule, CommonModule, FormsModule, HttpClientModule],
    declarations: [JigsawUpload, JigsawUploadDirective, FileInfoList],
    exports: [JigsawUpload, JigsawUploadDirective],
    entryComponents: [FileInfoList],
    providers: [PopupService],
})
export class JigsawUploadModule {

}

export * from './upload';
export * from './upload.base';
export * from './upload.directive';
