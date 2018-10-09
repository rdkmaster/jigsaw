import {AfterViewInit, Component, ElementRef, NgModule, Renderer2, ViewChild} from "@angular/core";
import {JigsawBoxModule} from "../box/index";
import {JigsawButtonModule} from "../button/button";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawDraggableModule, JigsawDroppableModule} from "../../directive/dragdrop/index";
import {DragDropInfo} from "../../directive/dragdrop/types";
import {FormsModule} from "@angular/forms";
import {JigsawUploadDirective} from "./upload.directive";
import {JigsawUploadBase} from "./upload.base";

@Component({
    selector: 'jigsaw-upload, j-upload',
    templateUrl: 'upload.html',
    host: {
        '[class.jigsaw-upload]': 'true'
    }
})
export class JigsawUpload extends JigsawUploadBase implements AfterViewInit {

    constructor(protected _http: HttpClient, protected _renderer: Renderer2, protected _elementRef: ElementRef) {
        super(_http, _renderer, _elementRef);
    }

    @ViewChild('fileInput')
    private _fileInput: ElementRef;

    ngAfterViewInit() {
        this._fileInputEl = this._fileInput.nativeElement;
    }

    public _$fileDragEnterHandle(dragInfo: DragDropInfo) {
        dragInfo.event.dataTransfer.dropEffect = 'all';
        if (dragInfo.event.dataTransfer.effectAllowed == 'all') {
            this._renderer.addClass(this._elementRef.nativeElement, 'jigsaw-upload-drag-over');
        }
    }

    public _$fileDragOverHandle(dragInfo: DragDropInfo) {
        dragInfo.event.dataTransfer.dropEffect = 'all';
        if (dragInfo.event.dataTransfer.effectAllowed == 'all') {
            this._renderer.addClass(this._elementRef.nativeElement, 'jigsaw-upload-drag-over');
        }
    }

    public _$fileDragLeaveHandle(dragInfo: DragDropInfo) {
        this._renderer.removeClass(this._elementRef.nativeElement, 'jigsaw-upload-drag-over');
    }

    public _$fileDropHandle(dragInfo: DragDropInfo) {
        this._renderer.removeClass(this._elementRef.nativeElement, 'jigsaw-upload-drag-over');
        this._$upload(dragInfo.event.dataTransfer.files);
    }
}

@NgModule({
    imports: [JigsawBoxModule, JigsawButtonModule, PerfectScrollbarModule, JigsawDraggableModule,
        JigsawDroppableModule, CommonModule, FormsModule, HttpClientModule],
    declarations: [JigsawUpload, JigsawUploadDirective],
    exports: [JigsawUpload, JigsawUploadDirective]
})
export class JigsawUploadModule {

}
