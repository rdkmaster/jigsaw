import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Optional,
    Output,
    Renderer2,
    ChangeDetectorRef
} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {AbstractJigsawComponent} from "../../common/common";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {TimeGr, TimeService, TimeUnit, TimeWeekStart} from "../../common/service/time.service";

export type UploadFileInfo = {
    name: string, url: string, file: File,
    state: 'pause' | 'loading' | 'success' | 'error',
    progress?: number, log?: UploadingFileLog[]
};

export type UploadingFileLog = {
    time: string,
    content: string
}

@Directive()
export class JigsawUploadBase extends AbstractJigsawComponent implements OnDestroy {
    constructor(@Optional() protected _http: HttpClient,
                protected _renderer: Renderer2,
                protected _elementRef: ElementRef,
                @Optional() protected _translateService: TranslateService,
                protected _cdr: ChangeDetectorRef) {
        super();
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public targetUrl: string = '/rdk/service/common/upload';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public fileType: string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public multiple: boolean = true;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public contentField: string = 'file';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public fileNameField: string = 'filename';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public fileVerify: string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public additionalFields: { [prop: string]: string };

    private _minSize: number;

    /**
     * @NoMarkForCheckRequired
     */
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

    /**
     * @NoMarkForCheckRequired
     */
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
    public reupload = new EventEmitter<UploadFileInfo>();

    @Output()
    public complete = new EventEmitter<UploadFileInfo[]>();

    @Output()
    public start = new EventEmitter<UploadFileInfo[]>();

    @Output()
    public update = new EventEmitter<UploadFileInfo[]>();

    /**
     * @internal
     */
    public _$uploadMode: 'select' | 'selectAndList' = 'select';

    protected _fileInputEl: Element;

    private _removeFileChangeEvent: Function;

    /**
     * @internal
     */
    public _$validFiles: UploadFileInfo[] = [];

    /**
     * @internal
     */
    public _$invalidFiles: UploadFileInfo[] = [];

    public get _$allFiles(): UploadFileInfo[] {
        return [...this._$validFiles, ...this._$invalidFiles];
    }

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
        if (!this._http) {
            console.error('Jigsaw upload pc-components must inject HttpClientModule, please import it to the module!');
            return;
        }

        if (!files) {
            const fileInput = this._fileInputEl;
            files = fileInput['files'];
        }
        if (!files || !files.length) {
            console.warn('there are no upload files');
            return;
        }

        if (!this.multiple) {
            this._$validFiles = [];
            this._$invalidFiles = [];
        }

        this._classifyFiles(Array.from(files));
        const pendingFiles = this._$validFiles.filter(file => file.state == 'pause');
        for (let i = 0, len = Math.min(5, pendingFiles.length); i < len; i++) {
            // 最多前5个文件同时上传给服务器
            this._sequenceUpload(pendingFiles[i]);
        }

        this._$uploadMode = 'selectAndList';
        if (pendingFiles.length > 0) {
            this.start.emit(this._$validFiles);
        }

        if (this._fileInputEl) {
            this._fileInputEl['value'] = null;
        }
    }

    private _testFileType(fileName: string, type: string): boolean {
        const re = new RegExp(`.+\\${type.trim()}$`, 'i');
        return re.test(fileName);
    }

    private _classifyFiles(files: File[]): void {
        if (this.fileType) {
            const fileTypes = this.fileType.split(',');
            const oldFiles = files;
            files = files.filter(f => !!fileTypes.find(ft => this._testFileType(f.name, ft)));
            oldFiles.filter(f => files.indexOf(f) == -1).forEach(file => {
                let fileInfo: UploadFileInfo = {
                    name: file.name,
                    state: "error",
                    url: "",
                    file: file,
                    progress: 0
                }
                this._statusLog(fileInfo, this._translateService.instant(`upload.fileTypeError`))
                this._$invalidFiles.push(fileInfo);
                this.update.emit(this._$allFiles);
            });
        }

        if (this.minSize) {
            const oldFiles = files;
            files = files.filter(f => f.size >= this.minSize * 1024 * 1024);
            oldFiles.filter(f => files.indexOf(f) == -1).forEach(file => {
                let fileInfo: UploadFileInfo = {
                    name: file.name,
                    state: 'error',
                    url: '',
                    file: file,
                    progress: 0
                }
                this._statusLog(fileInfo, this._translateService.instant(`upload.fileMinSizeError`))
                this._$invalidFiles.push(fileInfo);
                this.update.emit(this._$allFiles);
            });
        }

        if (this.maxSize) {
            const oldFiles = files;
            files = files.filter(f => f.size <= this.maxSize * 1024 * 1024);
            oldFiles.filter(f => files.indexOf(f) == -1).forEach(file => {
                let fileInfo: UploadFileInfo = {
                    name: file.name,
                    state: 'error',
                    url: '',
                    file: file,
                    progress: 0
                }
                this._statusLog(fileInfo, this._translateService.instant(`upload.fileMaxSizeError`))
                this._$invalidFiles.push(fileInfo);
                this.update.emit(this._$allFiles);
            });
        }

        files.forEach((file: File) => {
            let fileInfo: UploadFileInfo = {
                name: file.name,
                state: 'pause',
                url: '',
                file: file,
                progress: 0
            }
            this._statusLog(fileInfo, this._translateService.instant(`upload.waiting`))
            this._$validFiles.push(fileInfo);
            this.update.emit(this._$allFiles);
        });
    }

    private _isAllFilesUploaded(): boolean {
        return !this._$validFiles.find(f => f.state == 'loading' || f.state == 'pause');
    }

    private _sequenceUpload(fileInfo: UploadFileInfo) {
        fileInfo.state = 'loading';
        this._statusLog(fileInfo, this._translateService.instant(`upload.uploading`));
        const formData = new FormData();
        formData.append(this.contentField, fileInfo.file);
        this._appendAdditionalFields(formData, fileInfo.file.name);
        this._http.post(this.targetUrl, formData,
            {
                responseType: 'text',
                reportProgress: true,
                observe: 'events'
            }).subscribe(res => {
                console.log(res);
                if (res.type === 1) {
                    fileInfo.progress = res["loaded"] / res["total"] * 100;
                    this.update.emit(this._$allFiles);
                }
                if (res.type === 3) {
                    fileInfo.url = res["partialText"];
                }
                if (res.type === 4) {
                    const resp: HttpResponse<string> = <HttpResponse<string>>res;
                    fileInfo.state = 'success';
                    fileInfo.url = resp.body && typeof resp.body == 'string' ? resp.body : fileInfo.url;
                    this._statusLog(fileInfo, this._translateService.instant(`upload.done`));
                    this._afterCurFileUploaded(fileInfo);
                }
            }, (e) => {
                fileInfo.state = 'error';
                this._statusLog(fileInfo, this._translateService.instant(`upload.${e.statusText}`));
                this._afterCurFileUploaded(fileInfo);
            });
    }

    private _appendAdditionalFields(formData: FormData, fileName: string): void {
        const additionalFields = CommonUtils.shallowCopy(this.additionalFields || {});

        // 为了避免引入破坏性，这里按照顺序append
        const fileNameField = this.fileNameField ? this.fileNameField.trim() : '';
        if (fileNameField) {
            formData.append(fileNameField, encodeURIComponent(fileName));
            delete additionalFields[fileNameField];
        }

        const fileVerify = this.fileVerify ? this.fileVerify.trim() : '';
        if (fileVerify) {
            formData.append('file-verify', encodeURIComponent(fileVerify));
            delete additionalFields['file-verify'];
        }

        for (let prop in this.additionalFields) {
            formData.append(prop, encodeURIComponent(this.additionalFields[prop]));
        }
    }

    private _afterCurFileUploaded(fileInfo: UploadFileInfo) {
        this.progress.emit(fileInfo);

        const waitingFile = this._$validFiles.find(f => f.state == 'pause');
        if (waitingFile) {
            this._sequenceUpload(waitingFile)
        } else if (this._isAllFilesUploaded()) {
            this.complete.emit(this._$validFiles);
            this.update.emit(this._$allFiles);
        }
        this._cdr.markForCheck();
    }

    private _statusLog(fileInfo: UploadFileInfo, content: string) {
        if (!fileInfo.log) {
            fileInfo.log = [];
        }
        const log = {
            time: TimeService.convertValue(new Date(), TimeGr.second),
            content: content
        }
        fileInfo.log.push(log);
    }

    /**
     * @internal
     */
    public _$removeFile(file) {
        this.remove.emit(file);
        let fileIndex = this._$validFiles.findIndex(f => f == file);
        if (fileIndex != -1) {
            this._$validFiles.splice(fileIndex, 1);
            // 保持向下兼容
            if (this._isAllFilesUploaded()) {
                this.update.emit(this._$allFiles);
            }
        }
        fileIndex = this._$invalidFiles.findIndex(f => f == file);
        if (fileIndex != -1) {
            this._$invalidFiles.splice(fileIndex, 1);
              // 保持向下兼容
              if (this._isAllFilesUploaded()) {
                this.update.emit(this._$allFiles);
            }
        }
        if (this._fileInputEl) {
            this._fileInputEl['value'] = null;
        }
    }

    public _$reupload(file:UploadFileInfo){
        this.reupload.emit(file);
        file.progress = 0;
        this._sequenceUpload(file);
    }

    public clearFileList() {
        this._$validFiles = [];
        this._$invalidFiles = [];
        this._cdr.detectChanges();
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
