import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    NgZone, OnDestroy, EventEmitter, Output, ViewChild
} from "@angular/core";
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from "rxjs";
import {AbstractJigsawComponent, WingsTheme} from "../../common/common";
import {IUploader, UploadFileInfo} from "../../common/directive/upload/uploader-typings";
import {PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';

@WingsTheme('upload-result.scss')
@Component({
    selector: "jigsaw-upload-result, j-upload-result",
    templateUrl: "upload-result.html",
    host: {
        "[style.width]": "width",
        "[style.height]": "height",
        '[attr.data-theme]': 'theme',
        "[class.jigsaw-upload-result-host]": "true"
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawUploadResult extends AbstractJigsawComponent implements OnDestroy {
    constructor(private _translateService: TranslateService,
        /**
        * @internal
        */
        public _$cdr: ChangeDetectorRef, protected _zone?: NgZone) {
        super(_zone);
    }

    private readonly _fileTypeError = this._translateService.instant(`upload.fileTypeError`);
    private readonly _fileMinSizeError = this._translateService.instant(`upload.fileMinSizeError`);
    private readonly _fileMaxSizeError = this._translateService.instant(`upload.fileMaxSizeError`);
    private _dataSendProgressSubscription: Subscription;
    private _startUploadSubscription: Subscription;
    private _changeUploadSubscription: Subscription;
    private _completeSubscription: Subscription;
    private _progressSubscription: Subscription;

    public get files(): UploadFileInfo[] {
        return this.uploader ? this.uploader.files : [];
    }

    @Output()
    public change: EventEmitter<UploadFileInfo[]> = new EventEmitter<UploadFileInfo[]>();

    @Output()
    public progress = new EventEmitter<UploadFileInfo>();

    @Output()
    public remove = new EventEmitter<UploadFileInfo>();

    @Output()
    public retry = new EventEmitter<UploadFileInfo>();

    @ViewChild(PerfectScrollbarDirective)
    private _perfectScrollbar: PerfectScrollbarDirective;

    public clear() {
        this.files.splice(0, this.files.length);
        this._$cdr.markForCheck();
    }

    /**
     * @internal
     */
    public _$paneAnimationEnd(e) {
        if (!e.target.classList.contains('jigsaw-collapse-arrow')) {
            return;
        }
        this._perfectScrollbar.update();
    }

    private _uploader: IUploader;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get uploader(): IUploader {
        return this._uploader;
    }

    public set uploader(value: IUploader) {
        if (!value || value === this._uploader) {
            return;
        }
        this._uploader = value;

        if (this._startUploadSubscription) {
            this._startUploadSubscription.unsubscribe();
        }
        this._startUploadSubscription = this._uploader.start.subscribe(() => {
            this.change.emit(this.files);
            this._$cdr.markForCheck();
        });

        if (this._changeUploadSubscription) {
            this._changeUploadSubscription.unsubscribe();
        }
        this._changeUploadSubscription = this._uploader.change.subscribe(() => {
            this.change.emit(this.files);
            this._$cdr.markForCheck();
        });

        if (this._completeSubscription) {
            this._completeSubscription.unsubscribe();
        }
        this._completeSubscription = this._uploader.complete.subscribe(() => {
            this.change.emit(this.files);
            this._$cdr.markForCheck();
        });

        if (this._progressSubscription) {
            this._progressSubscription.unsubscribe();
        }
        this._progressSubscription = this._uploader.progress.subscribe((fileInfo: UploadFileInfo) => {
            this.change.emit(this.files);
            this.progress.emit(fileInfo);
        });

        if (this._dataSendProgressSubscription) {
            this._dataSendProgressSubscription.unsubscribe();
        }
        this._dataSendProgressSubscription = this._uploader.dataSendProgress.subscribe(() => {
            this._$cdr.markForCheck();
        });
    }

    /**
     * @internal
     */
    public _$removeFile(fileInfo: UploadFileInfo) {
        const idx = this.files.findIndex(file => file == fileInfo);
        if (idx == -1) {
            console.error('Upload file info not found!', fileInfo);
            return;
        }
        this.files.splice(idx, 1);
        this.remove.emit(fileInfo);
        this.change.emit(this.files);
    }

    /**
     * @internal
     *
     * 特定类型的失败原因：类型错误，大小不符合，不让显示重新上传，因为没有意义
     */
    public _$checkRetry(file: UploadFileInfo): boolean {
        return file.message == this._fileTypeError || file.message == this._fileMinSizeError || file.message == this._fileMaxSizeError;
    }

    /**
     * @internal
     *
     */
    public _$retryUpload(file) {
        file.progress = 0;
        this.uploader.retryUpload(file);
        this.retry.emit(file);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._changeUploadSubscription) {
            this._changeUploadSubscription.unsubscribe();
        }
        if (this._startUploadSubscription) {
            this._startUploadSubscription.unsubscribe();
        }
        if (this._dataSendProgressSubscription) {
            this._dataSendProgressSubscription.unsubscribe();
        }
        if (this._completeSubscription) {
            this._completeSubscription.unsubscribe();
        }
    }
}
