import {
    ChangeDetectorRef,
    Directive,
    EventEmitter,
    HostListener,
    Input,
    NgZone,
    OnDestroy,
    Optional,
    Output,
    Renderer2
} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {AbstractJigsawComponent} from '../../common';
import {CommonUtils} from '../../core/utils/common-utils';
import {TimeGr, TimeService} from '../../service/time.service';
import {IUploader, UploadFileInfo} from "./uploader-typings";

declare const JSEncrypt: any;

const maxConcurrencyUpload = 5;

@Directive()
export abstract class JigsawUploadBase extends AbstractJigsawComponent {
    /**
     * @NoMarkForCheckRequired
     */
    @Input('uploadTargetUrl')
    public targetUrl: string = '/rdk/service/common/upload';

    /**
     * @NoMarkForCheckRequired
     */
    @Input('uploadFileType')
    public fileType: string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input('uploadMultiple')
    public multiple: boolean = true;

    /**
     * @NoMarkForCheckRequired
     */
    @Input('uploadContentField')
    public contentField: string = 'file';

    /**
     * @NoMarkForCheckRequired
     */
    @Input('uploadFileNameField')
    public fileNameField: string = 'filename';

    /**
     * @NoMarkForCheckRequired
     */
    @Input('uploadFileVerify')
    public fileVerify: string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input('uploadAdditionalFields')
    public additionalFields: { [prop: string]: string };

    protected _minSize: number;

    /**
     * @NoMarkForCheckRequired
     */
    @Input('uploadMinSize')
    public get minSize(): number {
        return this._minSize;
    }

    public set minSize(value: number) {
        value = parseFloat(<any>value);
        if (isNaN(value)) {
            console.error('minSize property must be a number, please input a number or number string');
            return;
        }
        this._minSize = value;
    }

    protected _maxSize: number;

    /**
     * @NoMarkForCheckRequired
     */
    @Input('uploadMaxSize')
    public get maxSize(): number {
        return this._maxSize;
    }

    public set maxSize(value: number) {
        value = parseFloat(<any>value);
        if (isNaN(value)) {
            console.error('maxSize property must be a number, please input a number or number string');
            return;
        }
        this._maxSize = value;
    }

    @Input('uploadImmediately')
    public uploadImmediately: boolean = true;

    /**
     * 标识是否批量模式
     */
    @Input('uploadBatchMode')
    public batchMode: boolean = false;

    @Input('uploadOffline')
    public offline: boolean = false;

    /**
     * 每个文件上传完成（无论成功还是失败）之后发出，此事件给出的进度为文件个数来计算
     */
    @Output('uploadProgress')
    public progress = new EventEmitter<UploadFileInfo>();

    /**
     * 每个文件上传过程，服务端接收到客户端发送的数据后发出此事件，此事件给出的进度为单文件数据上传进度
     */
    @Output('uploadDataSendProgress')
    public dataSendProgress = new EventEmitter<UploadFileInfo>();

    @Output('uploadComplete')
    public complete = new EventEmitter<UploadFileInfo[]>();

    @Output('uploadFileVerificationFailed')
    public fileVerificationFailed = new EventEmitter<UploadFileInfo[]>();

    @Output('uploadStart')
    public start = new EventEmitter<UploadFileInfo[]>();

    @Output('uploadChange')
    public change = new EventEmitter<UploadFileInfo[]>();
}

@Directive({
    selector: '[j-upload], [jigsaw-upload]'
})
export class JigsawUploadDirective extends JigsawUploadBase implements IUploader, OnDestroy {
    constructor(@Optional() private _http: HttpClient,
                private _renderer: Renderer2,
                @Optional() private _translateService: TranslateService,
                private _cdr: ChangeDetectorRef,
                // _zone给runAfterMicrotasks用的
                protected _zone: NgZone) {
        super();
    }

    public files: UploadFileInfo[] = [];

    @HostListener('click', ['$event'])
    onClick($event) {
        $event.preventDefault();
        $event.stopPropagation();
        if (!this._http) {
            console.error('Jigsaw upload pc-components must inject HttpClientModule, please import it to the module!');
            return;
        }

        const e = document.createEvent("MouseEvent");
        e.initEvent("click", true, true);
        if (!this._fileInputElement) {
            this._fileInputElement = document.createElement('input');
            this._fileInputElement.setAttribute('type', 'file');
            //指令模式动态创建的input不在dom中的时候，此处将其加入body中，设置其不可见
            this._fileInputElement.style.display = 'none';
            document.body.appendChild(this._fileInputElement);
        }
        if (this.multiple) {
            this._fileInputElement.setAttribute('multiple', 'true');
        } else {
            this._fileInputElement.removeAttribute('multiple');
        }
        this._fileInputElement.setAttribute('accept', this.fileType);

        this._removeFileChangeEvent = this._removeFileChangeEvent ? this._removeFileChangeEvent :
            this._renderer.listen(this._fileInputElement, 'change', () => {
                if (!this.multiple) {
                    this.clear();
                }
                if (this.uploadImmediately) {
                    this.upload();
                } else {
                    this._appendFiles();
                }
            });

        this._fileInputElement.dispatchEvent(e);
    }

    private _fileInputElement: HTMLElement;
    private _removeFileChangeEvent: Function;

    public retryUpload(fileInfo: UploadFileInfo) {
        if (this.offline) {
            return;
        }
        if (this.batchMode) {
            this._retryBatchUpload(fileInfo);
            return;
        }
        if (!fileInfo || !fileInfo.file) {
            console.error('invalid retry upload file:', fileInfo);
            return;
        }
        if (!this.files.find(file => file === fileInfo)) {
            console.error('invalid retry upload file: the file is in our file list, maybe it was removed from our file list:', fileInfo);
            return;
        }
        if (!this._isFileUploaded(fileInfo)) {
            console.error('invalid retry upload file, this file is still pending:', fileInfo);
            return;
        }

        const uploadingCount = this.files.filter(file => file.state == 'loading').length;
        if (uploadingCount < maxConcurrencyUpload) {
            this._sequenceUpload(fileInfo);
        } else {
            // 排队，后面上传线程有空了，会再来上传它的。
            fileInfo.state = 'pause';
            fileInfo.message = this._translateService.instant(`upload.waiting`);
        }
    }

    private _retryBatchUpload(fileInfo: UploadFileInfo) {
        let uploadFileInfo: UploadFileInfo;
        if (fileInfo.files) {
            uploadFileInfo = fileInfo;
        } else {
            const errorFiles = this.files.filter(file => file.state == 'error');
            const files = errorFiles.map(info => info.file).filter(file => !!file);
            uploadFileInfo = { ...errorFiles[0], files };
        }
        this._sequenceUpload(uploadFileInfo);
    }

    /**
     * 清空所有已上传的文件
     */
    public clear() {
        this.files.splice(0, this.files.length);
        this._cdr.markForCheck();
    }

    private _appendFiles(): boolean {
        const fileInput: any = this._fileInputElement;
        if (!fileInput) {
            return false;
        }
        const files = this._checkFiles(Array.from(fileInput.files || []));
        const failFiles = files.filter(file => file.state == 'error')
        if (failFiles.length > 0) {
            this.fileVerificationFailed.emit(failFiles);
        }
        fileInput.value = null;
        this.files.push(...files);
        if (files.length > 0) {
            this.change.emit(this.files);
        }
        return this.files.length > 0;
    }

    public appendFiles(fileList: FileList) {
        const files = this._checkFiles(Array.from(fileList || []));
        this.files.push(...files);
        this.change.emit(this.files);
    }

    public upload() {
        this.runAfterMicrotasks(() => {
            this._zone.run(() => {
                if (!this._appendFiles() && this.files.length === 0) {
                    return;
                }
                this.start.emit(this.files);
                if (this.offline) {
                    return;
                }
                const pendingFiles = this.files.filter(file => file.state == 'pause');
                if (pendingFiles.length == 0) {
                    this.complete.emit(this.files);
                    return;
                }
                if (this.batchMode) {
                    const files = pendingFiles.map((item) => item.file).filter((file) => !!file);
                    const pendingFile = { ...pendingFiles[0], files: files };
                    this._sequenceUpload(pendingFile);
                    return;
                }
                for (let i = 0, len = Math.min(maxConcurrencyUpload, pendingFiles.length); i < len; i++) {
                    // 最多前maxConcurrencyUpload个文件同时上传给服务器
                    this._sequenceUpload(pendingFiles[i]);
                }
            })
        });
    }

    private _testFileType(fileName: string, type: string): boolean {
        if (type == '*') {
            return true;
        }
        const re = new RegExp(`.+\\${type.trim()}$`, 'i');
        return re.test(fileName);
    }

    private _checkFiles(files: File[]): UploadFileInfo[] {
        const fileTypes = this.fileType ? this.fileType.trim().split(/\s*,\s*/) : ['*'];
        return files.map(file => {
            const fileInfo: UploadFileInfo = {
                name: file.name, state: "error", url: "", file: file, progress: 0,
                message: this._translateService.instant(`upload.unknownStatus`)
            }
            if (!fileTypes.find(type => this._testFileType(file.name, type))) {
                fileInfo.errorType = "fileTypeError";
                fileInfo.message = this._translateService.instant(`upload.fileTypeError`);
                this._statusLog(fileInfo, fileInfo.message);
                return fileInfo;
            }
            if (!isNaN(this.minSize) && file.size < this.minSize * 1024 * 1024) {
                fileInfo.errorType = "fileMinSizeError";
                fileInfo.message = this._translateService.instant(`upload.fileMinSizeError`);
                this._statusLog(fileInfo, fileInfo.message);
                return fileInfo;
            }
            if (!isNaN(this.maxSize) && file.size > this.maxSize * 1024 * 1024) {
                fileInfo.errorType = "fileMaxSizeError";
                fileInfo.message = this._translateService.instant(`upload.fileMaxSizeError`);
                this._statusLog(fileInfo, fileInfo.message);
                return fileInfo;
            }

            fileInfo.state = 'pause';
            fileInfo.message = this._translateService.instant(`upload.waiting`);
            this._statusLog(fileInfo, fileInfo.message);
            return fileInfo;
        });
    }

    private _isAllFilesUploaded(): boolean {
        return !this.files.find(f => !this._isFileUploaded(f));
    }

    private _isFileUploaded(fileInfo: UploadFileInfo): boolean {
        return fileInfo.state !== 'loading' && fileInfo.state !== 'pause'
    }

    private _sequenceUpload(fileInfo: UploadFileInfo) {
        const updateState = (fileInfo: UploadFileInfo) => {
            fileInfo.state = 'loading';
            fileInfo.message = this._translateService.instant(`upload.uploading`);
            this._statusLog(fileInfo, fileInfo.message);
        }
        const formData: FormData = new FormData();
        if (fileInfo.files) {
            // 把多个file凑成一个formData
            this.files.filter(file => file.url == "").forEach((item: any) => updateState(item));
            fileInfo.files.forEach(file => formData.append(this.contentField, file, file.name));
            this._appendAdditionalFields(formData, 'multiple-files-combined');
        } else {
            updateState(fileInfo);
            formData.append(this.contentField, fileInfo.file, fileInfo.file.name);
            this._appendAdditionalFields(formData, fileInfo.file.name);
        }
        const options: any = {responseType: 'text', reportProgress: true, observe: 'events'};
        this._http.post(this.targetUrl, formData, options).subscribe((res: any) => {
            if (res.type === 1) {
                if (fileInfo.files) {
                    const totalBytes = this.files.filter(file => file.url == "").reduce((acc, item) => acc + item.file.size, 0);
                    this.files.filter(file => file.url == "").forEach(item => {
                        const fileBytes = item.file.size;
                    })
                    console.log(this.files[0].file.size, this.files[1].file.size)
                } else {
                    fileInfo.progress = res.loaded / res.total * 100;
                    this.dataSendProgress.emit(fileInfo);
                }
                return;
            }
            if (res.type === 3) {
                fileInfo.url = res.partialText;
                return;
            }
            if (res.type !== 4) {
                return;
            }

            const resp: HttpResponse<string> = <HttpResponse<string>>res;
            const update = (fileInfo: UploadFileInfo) => {
                fileInfo.state = 'success';
                fileInfo.message = '';
                fileInfo.url = resp.body && typeof resp.body == 'string' ? resp.body : fileInfo.url;
                this._statusLog(fileInfo, this._translateService.instant(`upload.done`));
            }
            if (fileInfo.files) {
                this.files.forEach(item => update(item));
            } else {
                update(fileInfo);
                this._afterCurFileUploaded(fileInfo);
            }
        }, (e) => {
            const update = (fileInfo: UploadFileInfo) => {
                fileInfo.state = 'error';
                fileInfo.message = message;
                this._statusLog(fileInfo, message);
            }
            const message = this._translateService.instant(`upload.${e.statusText}`) || e.statusText;
            if (this.batchMode) {
                this.files.filter(file => file.url == "").forEach((item: any) => update(item));
                return;
            }
            update(fileInfo);
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

        // 这里将配置的文件类型，放入 allowedFileTypes 这个属性中，用于上传服务的校验，未配置则传星号，表示支持所有类型
        const fileTypes = this.fileType ? this.fileType.trim() : '*';
        const allowedFileTypes = typeof JSEncrypt == "function" ? encrypt(fileTypes) : fileTypes;
        formData.append('allowedFileTypes', encodeURIComponent(allowedFileTypes));

        for (let prop in this.additionalFields) {
            formData.append(prop, encodeURIComponent(this.additionalFields[prop]));
        }
    }

    private _afterCurFileUploaded(fileInfo: UploadFileInfo) {
        this.progress.emit(fileInfo);

        if (!this.multiple) {
            this.complete.emit(this.files);
            return;
        }

        const waitingFile = this.files.find(f => f.state == 'pause');
        if (waitingFile) {
            this._sequenceUpload(waitingFile)
        } else if (this._isAllFilesUploaded()) {
            this.complete.emit(this.files);
        }
        this._cdr.markForCheck();
    }

    private _statusLog(fileInfo: UploadFileInfo, content: string) {
        if (!fileInfo.log) {
            fileInfo.log = [];
        }
        const log = {time: TimeService.convertValue(new Date(), TimeGr.second), content: content};
        fileInfo.log.push(log);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removeFileChangeEvent) {
            this._removeFileChangeEvent();
            this._removeFileChangeEvent = null;
        }
        if (CommonUtils.isDefined(this._fileInputElement)){
            document.body.removeChild(this._fileInputElement);
            this._fileInputElement = null;
        }
    }
}

const PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDNsaW+pHR7tipUGYt+ZpYz+lLlep5le40PDFKrRXkjbFXjemTIGW0s1MRdtwXouHnn8a8gucNs6peFdy3kzFe2pfxIXmNLkkzV2vSZslQEHpCsDlibgoF9KSWDYJVC5Jb1AgTxOd5/Ay/ub58SgrOcbbAq2WCT0TCDQSpUZGB9LQIDAQAB";

function encrypt(data: string): string {
    const encryptor: { setPublicKey: Function, encrypt: Function } = new JSEncrypt();
    encryptor.setPublicKey(PUBLIC_KEY);
    return encryptor.encrypt(data);
}
