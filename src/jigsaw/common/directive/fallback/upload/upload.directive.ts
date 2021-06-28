import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    Optional,
    Output,
    Renderer2
} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {
    ButtonInfo,
    IPopupable,
    PopupEffect,
    PopupInfo,
    PopupOptions,
    PopupPositionType,
    PopupPositionValue,
    PopupService
} from "../../../service/popup.service";
import {JigsawUploadFallbackBase, UploadFileInfoFallback} from "../../../../pc-components/fallback/upload/upload.base";
import {AbstractJigsawComponent} from "../../../common";

@Directive({
    selector: '[j-upload-fallback], [jigsaw-upload-fallback]'
})
export class JigsawUploadFallbackDirective extends JigsawUploadFallbackBase implements OnDestroy {
    constructor(@Optional() protected _http: HttpClient,
                protected _renderer: Renderer2,
                protected _elementRef: ElementRef,
                private _popupService: PopupService,
                @Optional() protected _translateService: TranslateService,
                protected _cdr: ChangeDetectorRef) {
        super(_http, _renderer, _elementRef, _translateService, _cdr);
    }

    private _removeMouseOverHandler: Function;
    private _removeMouseOutHandler: Function;
    private _rollOutDenouncesTimer: any = null;
    private _rollInDenouncesTimer: any = null;

    @Input('uploadTargetUrl')
    public targetUrl: string = '/rdk/service/common/upload';

    @Input('uploadFileType')
    public fileType: string;

    @Input('uploadMultiple')
    public multiple: boolean = true;

    @Input('uploadContentField')
    public contentField: string = 'file';

    @Input('uploadFileNameField')
    public fileNameField: string = 'filename';

    @Input('uploadFileVerify')
    public fileVerify: string;

    @Input('uploadAdditionalFields')
    public additionalFields: { [prop: string]: string };

    protected _minSize: number;
    @Input('uploadMinSize')
    public get minSize(): number {
        return this._minSize;
    }

    public set minSize(value: number) {
        this._minSize = value;
    }

    protected _maxSize: number;
    @Input('uploadMaxSize')
    public get maxSize(): number {
        return this._maxSize;
    }

    public set maxSize(value: number) {
        this._maxSize = value;
    }

    @Output('uploadProgress')
    public progress = new EventEmitter<UploadFileInfoFallback>();

    @Output('uploadRemove')
    public remove = new EventEmitter<UploadFileInfoFallback>();

    @Output('uploadComplete')
    public complete = new EventEmitter<UploadFileInfoFallback[]>();

    @Output('uploadStart')
    public start = new EventEmitter<UploadFileInfoFallback[]>();

    @Output('uploadUpdate')
    public update = new EventEmitter<UploadFileInfoFallback[]>();

    @Input()
    public uploadOptionCount: number;

    @Input()
    public uploadShowFileList: boolean = true;

    @HostListener('click', ['$event'])
    onClick($event) {
        this._$selectFile($event);
    }

    @HostListener('mouseenter', ['$event'])
    onMouseEnter() {
        if (!this.uploadShowFileList || this._$validFiles.length + this._$invalidFiles.length == 0) {
            return;
        }
        this.clearCallLater(this._rollOutDenouncesTimer);
        this._addRollInDenouncesTimer();
    }

    @HostListener('mouseleave', ['$event'])
    onMouseLeave() {
        if (!this.uploadShowFileList) {
            return;
        }
        this.clearCallLater(this._rollInDenouncesTimer);
        this._addRollOutDenouncesTimer();
    }

    private _addRollInDenouncesTimer() {
        this._rollInDenouncesTimer = this.callLater(() => {
            if (this._popupInfo) {
                return;
            }
            this._popupInfo = this._popupService.popup(JigsawUploadFileInfoListFallback, this._getNonModelOptions(), this._$allFiles);

            if (!this._popupInfo || !this._popupInfo.element || !this._popupInfo.instance) {
                console.error('unable to popup drop down, unknown error!');
                return;
            }

            if (this._popupInfo.instance instanceof JigsawUploadFileInfoListFallback) {
                this._popupInfo.instance.uploader = this;
                this._popupInfo.instance.optionCount = this.uploadOptionCount;
                this._popupInfo.instance.removable = false;
            }

            this._closeAllListener();
            this._removeMouseOverHandler = this._renderer.listen(
                this._popupInfo.element, 'mouseenter',
                () => this.clearCallLater(this._rollOutDenouncesTimer));
            this._removeMouseOutHandler = this._renderer.listen(
                this._popupInfo.element, 'mouseleave', () => {
                    this._addRollOutDenouncesTimer();
                });
        }, 100);
    }

    private _addRollOutDenouncesTimer() {
        this._rollOutDenouncesTimer = this.callLater(() => {
            this._closePopup();
        }, 400);
    }

    private _popupInfo: PopupInfo;

    private _getNonModelOptions(): PopupOptions {
        return {
            modal: false,
            showEffect: PopupEffect.fadeIn,
            hideEffect: PopupEffect.fadeOut,
            pos: this._elementRef,
            posOffset: {
                top: this._elementRef.nativeElement.offsetHeight
            },
            posReviser: (pos: PopupPositionValue, popupElement: HTMLElement): PopupPositionValue => {
                return this._popupService.positionReviser(pos, popupElement, {
                    offsetWidth: this._elementRef.nativeElement.offsetWidth,
                    offsetHeight: this._elementRef.nativeElement.offsetHeight
                });
            },
            size: {width: 300},
            posType: PopupPositionType.absolute
        };
    }

    private _closePopup() {
        if (this._popupInfo) {
            this._popupInfo.dispose();
            this._popupInfo = null;
        }
        this._closeAllListener();
    }

    private _closeAllListener() {
        if (this._removeMouseOverHandler) {
            this._removeMouseOverHandler();
            this._removeMouseOverHandler = null;
        }
        if (this._removeMouseOutHandler) {
            this._removeMouseOutHandler();
            this._removeMouseOutHandler = null;
        }
    }

    protected _upload() {
        super._upload();
        this._recalculatePopupPosition();
    }

    /**
     * @internal
     */
    public _$removeFile(file) {
        super._$removeFile(file);
        this._recalculatePopupPosition();
    }

    private _recalculatePopupPosition() {
        this.runMicrotask(() => {
            if (this._popupInfo) {
                this._popupService.setPosition(this._getNonModelOptions(), this._popupInfo.element);
            }
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this._closePopup();
    }
}

@Component({
    selector: 'jigsaw-upload-file-list, j-upload-file-list',
    template: `
        <ul class="jigsaw-upload-fallback-file-list" [perfectScrollbar]="{wheelSpeed: 0.5, minScrollbarLength: 20}"
            [style.width]="width" [style.maxHeight.px]="optionCount > 0 ? 40*optionCount : ''">
            <li *ngFor="let file of initData" class="jigsaw-upload-file">
                <div class="jigsaw-upload-file-left">
                    <span class="jigsaw-upload-file-icon iconfont iconfont-e9d5"></span>
                    <span class="jigsaw-upload-file-name" title="{{file.name}}">{{file.name}}</span>
                </div>
                <div [ngSwitch]="file.state" class="jigsaw-upload-file-right" style="display: flex;align-items: center;justify-content: center;">
                    <ng-container *ngSwitchCase="'pause'">
                        <span>{{'upload.waiting' | translate}}</span>
                        <span class="jigsaw-upload-pause iconfont iconfont-ea25"></span>
                    </ng-container>
                    <ng-container *ngSwitchCase="'loading'">
                        <span>{{'upload.uploading' | translate}}</span>
                        <span class="jigsaw-upload-loading iconfont iconfont-e8dd jigsaw-am-rotation"></span>
                    </ng-container>
                    <ng-container *ngSwitchCase="'success'">
                        <span>{{'upload.done' | translate}}</span>
                        <span class="jigsaw-upload-success iconfont iconfont-ea38"></span>
                    </ng-container>
                    <ng-container *ngSwitchCase="'error'">
                        <div [title]="file.reason" style="display: flex;align-items: center;justify-content: center;">
                            <span>{{'upload.failed' | translate}}</span>
                            <span class="jigsaw-upload-error iconfont iconfont-e9b9"></span>
                        </div>
                    </ng-container>
                </div>
                <span *ngIf="removable" class="jigsaw-upload-file-remove iconfont iconfont-e9c3"
                      (click)="uploader?._$removeFile(file)"></span>
            </li>
        </ul>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawUploadFileInfoListFallback extends AbstractJigsawComponent implements IPopupable {
    public answer: EventEmitter<ButtonInfo>;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public initData: UploadFileInfoFallback[];
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public uploader: JigsawUploadFallbackDirective;
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public optionCount: number = 5;

    public removable: boolean = true;
}
