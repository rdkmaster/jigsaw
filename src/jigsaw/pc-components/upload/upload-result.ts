import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    NgZone, OnDestroy, EventEmitter, Output
} from "@angular/core";
import {Subscription} from "rxjs";
import { AbstractJigsawComponent } from "jigsaw/common/common";
import { JigsawUploadDirective, UploadFileInfo } from "jigsaw/common/directive/upload/upload.directive";

@Component({
    selector: "jigsaw-upload-result, j-upload-result",
    templateUrl: "upload-result.html",
    host: {
        "[style.width]": "width",
        "[style.height]": "height",
        "[class.jigsaw-upload-result-host]": "true"
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawUploadResult extends AbstractJigsawComponent implements OnDestroy {
    constructor(protected _cdr: ChangeDetectorRef, protected _zone?: NgZone) {
        super(_zone);
    }

    private _uploader: JigsawUploadDirective;
    private _dataSendProgressSubscription: Subscription;
    private _startUploadSubscription: Subscription;
    private _completeSubscription: Subscription;
    private _progressSubscription: Subscription;

    public get files(): UploadFileInfo[] {
        return this.uploader ? this.uploader.allFiles : [];
    }

    @Output()
    public change: EventEmitter<UploadFileInfo[]> = new EventEmitter<UploadFileInfo[]>();

    @Output()
    public progress = new EventEmitter<UploadFileInfo>();

    @Output()
    public remove = new EventEmitter<UploadFileInfo>();

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get uploader(): JigsawUploadDirective {
        return this._uploader;
    }

    public set uploader(value: JigsawUploadDirective) {
        if (!value || value === this._uploader) {
            return;
        }
        this._uploader = value;

        if (this._startUploadSubscription) {
            this._startUploadSubscription.unsubscribe();
        }
        this._startUploadSubscription = this._uploader.start.subscribe((fileInfos: UploadFileInfo[]) => {
            this.change.emit(this.files);
            this._cdr.markForCheck();
        });

        if (this._completeSubscription) {
            this._completeSubscription.unsubscribe();
        }
        this._completeSubscription = this._uploader.complete.subscribe(() => {
            this.change.emit(this.files);
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
            this._cdr.markForCheck();
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

    ngOnDestroy() {
        super.ngOnDestroy();
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
