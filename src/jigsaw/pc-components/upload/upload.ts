import {
    AfterViewInit, ChangeDetectionStrategy,
    Component,
    ElementRef,
    Optional,
    Renderer2,
    ViewChild
} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {JigsawUploadBase} from "./upload.base";
import {DragDropInfo} from "../../common/directive/dragdrop/types";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'jigsaw-upload, j-upload',
    templateUrl: 'upload.html',
    host: {
        '[class.jigsaw-upload]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawUpload extends JigsawUploadBase implements AfterViewInit {

    constructor(@Optional() protected _http: HttpClient,
                protected _renderer: Renderer2,
                protected _elementRef: ElementRef,
                @Optional() protected _translateService: TranslateService) {
        super(_http, _renderer, _elementRef, _translateService);
    }

    @ViewChild('fileInput')
    private _fileInput: ElementRef;

    ngAfterViewInit() {
        this._fileInputEl = this._fileInput ? this._fileInput.nativeElement : undefined;
    }

    /**
     * @internal
     */
    public _$fileDragEnterHandle(dragInfo: DragDropInfo) {
        dragInfo.event.dataTransfer.dropEffect = 'all';
        if (dragInfo.event.dataTransfer.effectAllowed == 'all') {
            this._renderer.addClass(this._elementRef.nativeElement, 'jigsaw-upload-drag-over');
        }
    }

    /**
     * @internal
     */
    public _$fileDragOverHandle(dragInfo: DragDropInfo) {
        dragInfo.event.dataTransfer.dropEffect = 'all';
        if (dragInfo.event.dataTransfer.effectAllowed == 'all') {
            this._renderer.addClass(this._elementRef.nativeElement, 'jigsaw-upload-drag-over');
        }
    }

    /**
     * @internal
     */
    public _$fileDragLeaveHandle(dragInfo: DragDropInfo) {
        this._renderer.removeClass(this._elementRef.nativeElement, 'jigsaw-upload-drag-over');
    }

    /**
     * @internal
     */
    public _$fileDropHandle(dragInfo: DragDropInfo) {
        this._renderer.removeClass(this._elementRef.nativeElement, 'jigsaw-upload-drag-over');
        this._upload(dragInfo.event.dataTransfer.files);
    }
}

