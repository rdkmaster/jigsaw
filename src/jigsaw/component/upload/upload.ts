import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DragDropInfo} from "../../directive/dragdrop/types";
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

