import {AbstractJigsawComponent} from "../../common/common";
import {ElementRef, EventEmitter, Input, OnDestroy, Optional, Output, Renderer2} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {CommonUtils} from "../../common/core/utils/common-utils";

export type UploadFileInfo = {
    name: string, url: string, file: File, reason: string,
    state: 'pause' | 'loading' | 'success' | 'error'
};

export class JigsawUploadBase extends AbstractJigsawComponent implements OnDestroy {
    constructor(@Optional() protected _http: HttpClient,
                protected _renderer: Renderer2,
                protected _elementRef: ElementRef,
                @Optional() protected _translateService: TranslateService) {
        super();
    }

    @Input()
    public targetUrl: string = '/rdk/service/common/upload';

    @Input()
    public fileType: string;

    @Input()
    public multiple: boolean = true;

    @Input()
    public contentField: string = 'file';

    @Input()
    public fileNameField: string = 'filename';

    private _minSize: number;

    @Input()
    public get minSize(): number {
        return this._minSize;
    }

    public set minSize(value: number) {
        if (isNaN(value)) {
            console.error('minSize property must be a number, please input a number or number string');
            return;
        }
        this._minSize = Number(value);
    }

    private _maxSize: number;

    @Input()
    public get maxSize(): number {
        return this._maxSize;
    }

    public set maxSize(value: number) {
        if (isNaN(value)) {
            console.error('max property must be a number, please input a number or number string');
            return;
        }
        this._maxSize = Number(value);
    }


    @Output()
    public progress = new EventEmitter<UploadFileInfo>();

    @Output()
    public remove = new EventEmitter<UploadFileInfo>();

    @Output()
    public complete = new EventEmitter<UploadFileInfo[]>();

    @Output()
    public start = new EventEmitter<UploadFileInfo[]>();

    @Output()
    public update = new EventEmitter<UploadFileInfo[]>();

    public _$uploadMode: 'select' | 'selectAndList' = 'select';

    public _$fileInfoList: UploadFileInfo[] = [];

    protected _fileInputEl: Element;

    private _removeFileChangeEvent: Function;

    private _inValidFileInfoList: UploadFileInfo[] = [];

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
            if (CommonUtils.isIE()) {
                //指令模式动态创建的input不在dom中的时候，ie11无法监听click事件，此处将其加入body中，设置其不可见
                this._fileInputEl.setAttribute('display', 'none');
                document.body.appendChild(this._fileInputEl);
            }
        }
        if (this.multiple) {
            this._fileInputEl.setAttribute('multiple', 'true');
        } else {
            this._fileInputEl.removeAttribute('multiple');
        }
        this._fileInputEl.setAttribute('accept', this.fileType);

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

        validFiles.forEach((file: File, index) => {
            const fileInfo: UploadFileInfo = {
                name: file.name, state: 'pause', url: '', file: file, reason: ''
            };
            if (this.multiple) {
                this._$fileInfoList.push(fileInfo);
            } else {
                this._$fileInfoList = [fileInfo];
            }
            if (index < 5) {
                this._sequenceUpload(fileInfo);
            }
        });

        this._$uploadMode = 'selectAndList';
        this.start.emit(this._$fileInfoList);

        if (this._fileInputEl) {
            this._fileInputEl['value'] = null;
        }

        if (validFiles.length == 0) {
            this._$fileInfoList = this._$fileInfoList.concat(this._inValidFileInfoList);
            this.complete.emit(this._$fileInfoList);
            this.update.emit(this._$fileInfoList)
        }
    }

    private _filterValidFiles(files: File[]): any[] {
        let typeValidFiles: File[] = [];
        let minSizeValidFiles: File[] = [];
        let maxSizeValidFiles: File[] = [];
        this._inValidFileInfoList = [];
        if (this.fileType) {
            const fileTypes = this.fileType.split(',');
            typeValidFiles = files.filter(f =>
                !!fileTypes.find(ft => new RegExp(`${ft.trim()}$`, 'i').test(f.name)));
            let inValidTypeFiles = files.filter(f =>
                !fileTypes.find(ft => new RegExp(`${ft.trim()}$`, 'i').test(f.name)));
            inValidTypeFiles.forEach(file => {
                this._inValidFileInfoList.push({
                    name: file.name,
                    state: 'error',
                    url: '',
                    file: file,
                    reason: this._translateService.instant(`upload.fileTypeError`)
                })
            });
        } else {
            typeValidFiles = typeValidFiles.concat(files);
        }
        if (this.minSize) {
            minSizeValidFiles = typeValidFiles.filter(f => f.size >= this.minSize * 1024 * 1024);
            let minSizeInValidFiles = typeValidFiles.filter(f => f.size < this.minSize * 1024 * 1024);
            minSizeInValidFiles.forEach(file => {
                this._inValidFileInfoList.push({
                    name: file.name,
                    state: 'error',
                    url: '',
                    file: file,
                    reason: this._translateService.instant(`upload.fileMinSizeError`)
                })
            });
        } else {
            minSizeValidFiles = minSizeValidFiles.concat(typeValidFiles)
        }

        if (this.maxSize) {
            maxSizeValidFiles = minSizeValidFiles.filter(f => f.size <= this.maxSize * 1024 * 1024);
            let maxSizeInValidFiles = minSizeValidFiles.filter(f => f.size > this.maxSize * 1024 * 1024);
            maxSizeInValidFiles.forEach(file => {
                this._inValidFileInfoList.push({
                    name: file.name,
                    state: 'error',
                    url: '',
                    file: file,
                    reason: this._translateService.instant(`upload.fileMaxSizeError`)
                })
            });
        } else {
            maxSizeValidFiles = maxSizeValidFiles.concat(minSizeValidFiles);
        }
        return maxSizeValidFiles;
    }

    private _isAllFilesUploaded(): boolean {
        return !this._$fileInfoList.find(f => f.state == 'loading' || f.state == 'pause');
    }

    private _sequenceUpload(fileInfo: UploadFileInfo) {
        fileInfo.state = 'loading';
        const formData = new FormData();
        formData.append(this.contentField, fileInfo.file);
        const fileNameField = this.fileNameField ? this.fileNameField.trim() : '';
        if (fileNameField) {
            formData.append(fileNameField, encodeURI(fileInfo.file.name));
        }
        if (!this._http) {
            console.error('Jigsaw upload pc-components must inject HttpClientModule, please import it to the module!');
            return;
        }
        this._http.post(this.targetUrl, formData, {responseType: 'text'}).subscribe(res => {
            fileInfo.state = 'success';
            fileInfo.url = res;
            fileInfo.reason = '';
            this._afterCurFileUploaded(fileInfo);
        }, (e) => {
            fileInfo.state = 'error';
            fileInfo.reason = this._translateService.instant(`upload.${e.statusText}`);
            this._afterCurFileUploaded(fileInfo);
        });
    }

    private _afterCurFileUploaded(fileInfo: UploadFileInfo) {
        this.progress.emit(fileInfo);

        const waitingFile = this._$fileInfoList.find(f => f.state == 'pause');
        if (waitingFile) {
            this._sequenceUpload(waitingFile)
        } else if (this._isAllFilesUploaded()) {
            this._$fileInfoList = this._$fileInfoList.concat(this._inValidFileInfoList);
            this.complete.emit(this._$fileInfoList);
            this.update.emit(this._$fileInfoList)
        }
    }

    public _$removeFile(file) {
        this.remove.emit(file);
        const fileIndex = this._$fileInfoList.findIndex(f => f == file);
        if (fileIndex == -1) {
            return;
        }
        this._$fileInfoList.splice(fileIndex, 1);
        if (this._isAllFilesUploaded()) {
            this.update.emit(this._$fileInfoList);
        }
        if (this._fileInputEl) {
            this._fileInputEl['value'] = null;
        }
    }

    public clearFileList() {
        this._$fileInfoList = [];
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
