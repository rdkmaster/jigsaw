import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Optional,
    Output,
    Renderer2,
    ViewChild
} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DragDropInfo} from "../../directive/dragdrop/types";
import {JigsawUploadBase, UploadFileInfo} from "./upload.base";

@Component({
    selector: 'jigsaw-upload, j-upload',
    templateUrl: 'upload.html',
    host: {
        '[class.jigsaw-upload]': 'true'
    }
})
export class JigsawUpload extends JigsawUploadBase implements AfterViewInit {

    constructor(@Optional() protected _http: HttpClient, protected _renderer: Renderer2, protected _elementRef: ElementRef) {
        super(_http, _renderer, _elementRef);
    }

    @Input()
    public targetUrl: string = '/rdk/service/common/upload';

    @Input()
    public fileType: string;

    @Input()
    public multiple: boolean = true;

    @Output()
    public progress = new EventEmitter<UploadFileInfo>();

    @Output()
    public complete = new EventEmitter<UploadFileInfo[]>();

    @Output()
    public start = new EventEmitter<void>();

    @ViewChild('fileInput')
    private _fileInput: ElementRef;

    ngAfterViewInit() {
        this._fileInputEl = this._fileInput ? this._fileInput.nativeElement : undefined;
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
        this._upload(dragInfo.event.dataTransfer.files);
    }
}

