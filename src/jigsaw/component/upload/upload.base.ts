import {AbstractJigsawComponent} from "../common";
import {ElementRef, EventEmitter, Input, OnDestroy, Optional, Output, Renderer2} from "@angular/core";
import {HttpClient} from "@angular/common/http";

export type UploadFileInfo = { name: string, state: 'pause' | 'loading' | 'success' | 'error', url: string, file: File };

export class JigsawUploadBase extends AbstractJigsawComponent implements OnDestroy {
    constructor(@Optional() protected _http: HttpClient, protected _renderer: Renderer2, protected _elementRef: ElementRef) {
        super();
    }

    @Input()
    public uploadTargetUrl: string = '/rdk/service/common/upload';

    @Input()
    public uploadFileType: string;

    @Input()
    public uploadMultiple: boolean = true;

    /**
     * @internal
     *
     * 前面版本用错了单词，这里保留下来以求向下兼容
     */
    @Output()
    public uploadProcess = new EventEmitter<UploadFileInfo>();

    @Output()
    public uploadProgress = new EventEmitter<UploadFileInfo>();

    @Output()
    public uploadComplete = new EventEmitter<UploadFileInfo[]>();

    @Output()
    public uploadStart = new EventEmitter();

    public _$uploadMode: 'select' | 'selectAndList' = 'select';

    public _$fileInfoList: UploadFileInfo[] = [];

    protected _fileInputEl: Element;

    private _removeFileChangeEvent: Function;

    /**
     * @internal
     */
    public _$selectFile($event) {
        $event.preventDefault();
        $event.stopPropagation();
        let e = document.createEvent("MouseEvent");
        e.initEvent("click", true, true);

        if (!this._fileInputEl) {
            this._fileInputEl = document.createElement('input');
            this._fileInputEl.setAttribute('type', 'file');
        }
        if(this.uploadMultiple) {
            this._fileInputEl.setAttribute('multiple', 'true');
        } else {
            this._fileInputEl.removeAttribute('multiple');
        }
        this._fileInputEl.setAttribute('accept', this.uploadFileType);

        this._removeFileChangeEvent = this._removeFileChangeEvent ? this._removeFileChangeEvent :
            this._renderer.listen(this._fileInputEl, 'change', () => {
                this._upload();
            });

        this._fileInputEl.dispatchEvent(e);
    }

    protected _upload(files?: FileList) {
        if (!files) {
            const fileInput = this._fileInputEl;
            files = fileInput['files'];
        }

        if (!files || !files.length) {
            console.warn('there are no upload files');
            return;
        }

        let validFiles = this._filterValidFiles(Array.from(files));
        this._$fileInfoList = this._filterValidFiles(this._$fileInfoList);

        validFiles.forEach((file: File, index) => {
            const fileInfo: UploadFileInfo = {name: file.name, state: 'pause', url: '', file: file};
            if(this.uploadMultiple) {
                this._$fileInfoList.push(fileInfo);
            } else {
                this._$fileInfoList = [fileInfo];
            }
            if (index < 5) {
                this._sequenceUpload(fileInfo);
            }
        });

        this._$uploadMode = 'selectAndList';
        this.uploadStart.emit();

        if(this._fileInputEl) {
            this._fileInputEl['value'] = null;
        }
    }

    private _filterValidFiles(files) {
        if(!this.uploadFileType) return files;
        const fileTypes = this.uploadFileType.split(',');
        return files.filter(f =>
            !!fileTypes.find(ft => new RegExp(`${ft.trim()}$`).test(f.name)));
    }

    private _isAllFilesUploaded(): boolean {
        return !this._$fileInfoList.find(f => f.state == 'loading' || f.state == 'pause');
    }

    private _sequenceUpload(fileInfo: UploadFileInfo) {
        fileInfo.state = 'loading';
        const formData = new FormData();
        formData.append('file', fileInfo.file);
        formData.append("filename", encodeURI(fileInfo.file.name));
        if(!this._http) {
            console.error('Jigsaw upload component must inject HttpClientModule, please import it to the module!');
            return;
        }
        this._http.post(this.uploadTargetUrl, formData, {responseType: 'text'}).subscribe(res => {
            fileInfo.state = 'success';
            fileInfo.url = res;
            this._afterCurFileUploaded(fileInfo);
        }, err => {
            fileInfo.state = 'error';
            this._afterCurFileUploaded(fileInfo);
        });
    }

    private _afterCurFileUploaded(fileInfo: UploadFileInfo) {
        this.uploadProcess.emit(fileInfo);
        this.uploadProgress.emit(fileInfo);

        const waitingFile = this._$fileInfoList.find(f => f.state == 'pause');
        if (waitingFile) {
            this._sequenceUpload(waitingFile)
        } else if (this._isAllFilesUploaded()) {
            this.uploadComplete.emit(this._$fileInfoList);
        }
    }

    public _$removeFile(file) {
        const fileIndex = this._$fileInfoList.findIndex(f => f == file);
        if(fileIndex == -1) return;
        this._$fileInfoList.splice(fileIndex,1);
        if (this._isAllFilesUploaded()) {
            this.uploadComplete.emit(this._$fileInfoList);
        }
        if(this._fileInputEl) {
            this._fileInputEl['value'] = null;
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removeFileChangeEvent) {
            this._removeFileChangeEvent();
            this._removeFileChangeEvent = null;
        }

        this._fileInputEl = null;
    }

}
