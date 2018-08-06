import {Component, ElementRef, EventEmitter, Input, NgModule, Output, Renderer2, ViewChild} from "@angular/core";
import {AbstractJigsawComponent} from "../common";
import {JigsawBoxModule} from "../box/index";
import {JigsawButtonModule} from "../button/button";
import {HttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawDraggableModule, JigsawDroppableModule} from "../../directive/dragdrop/index";
import {DragDropInfo} from "../../directive/dragdrop/types";
import {FormsModule} from "@angular/forms";

export type UploadFileInfo = { name: string, state: 'pause' | 'loading' | 'success' | 'error', url: string, file: File };

@Component({
    selector: 'jigsaw-upload, j-upload',
    templateUrl: 'upload.html',
    host: {
        '[class.jigsaw-upload]': 'true'
    }
})
export class JigsawUpload extends AbstractJigsawComponent {
    constructor(private _http: HttpClient, private _renderer: Renderer2, private _elementRef: ElementRef) {
        super();
    }

    @Input()
    public multiple: boolean = true;

    public _$uploadMode: 'select' | 'single' | 'multiple' = 'select';

    public _$fileInfoList: UploadFileInfo[] = [];

    @ViewChild('fileInput') fileInput: ElementRef;

    @Output()
    public process = new EventEmitter<UploadFileInfo>();

    @Output()
    public complete = new EventEmitter<UploadFileInfo[]>();

    public _$selectFile($event) {
        $event.preventDefault();
        $event.stopPropagation();
        let e = document.createEvent("MouseEvent");
        e.initEvent("click", true, true);
        this.fileInput.nativeElement.dispatchEvent(e);
    }

    public _$upload(files?: FileList) {
        if (!files) {
            const fileInput = this.fileInput.nativeElement;
            files = fileInput['files'];
        }

        if (!files || !files.length) {
            console.warn('there are no upload files');
            return;
        }

        Array.from(files).forEach((file: File, index) => {
            const fileInfo: UploadFileInfo = {name: file.name, state: 'pause', url: '', file: file};
            this._$fileInfoList.push(fileInfo);
            if(index < 5) {
                this._sequenceUpload(fileInfo);
            }
        });

        this._$uploadMode = files.length == 1 ? 'single' : 'multiple';
    }

    set _$selectedFileChange(value) {
        this._$upload();
    }

    private _isAllFilesUploaded(): boolean {
        return !this._$fileInfoList.find(f => f.state == 'loading' || f.state == 'pause');
    }

    private _sequenceUpload(fileInfo: UploadFileInfo) {
        fileInfo.state = 'loading';
        const formData = new FormData();
        formData.append('file', fileInfo.file);
        formData.append("filename", encodeURI(fileInfo.file.name));
        this._http.post('/rdk/service/common/upload', formData, {responseType: 'text'}).subscribe(res => {
            fileInfo.state = 'success';
            fileInfo.url = res;
            this.process.emit(fileInfo);
            const waitedFile = this._$fileInfoList.find(f => f.state == 'pause');
            if(waitedFile) {
                this._sequenceUpload(waitedFile)
            } else if(this._isAllFilesUploaded()) {
                this.complete.emit(this._$fileInfoList);
            }
        }, err => {
            fileInfo.state = 'error'
        });
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
        JigsawDroppableModule, CommonModule, FormsModule],
    declarations: [JigsawUpload],
    exports: [JigsawUpload]
})
export class JigsawUploadModule {

}
