import {
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
import {
    ButtonInfo, IPopupable, PopupEffect, PopupInfo, PopupOptions, PopupPositionType, PopupPositionValue, PopupService
} from "../../common/service/popup.service";
import {JigsawUploadBase, UploadFileInfo} from "./upload.base";
import {AbstractJigsawComponent} from "../common";
import {TranslateService} from "@ngx-translate/core";

@Directive({
    selector: '[j-upload], [jigsaw-upload]'
})
export class JigsawUploadDirective extends JigsawUploadBase implements OnDestroy {
    constructor(@Optional() protected _http: HttpClient,
                protected _renderer: Renderer2,
                protected _elementRef: ElementRef,
                private _popupService: PopupService,
                @Optional() protected _translateService: TranslateService) {
        super(_http, _renderer, _elementRef, _translateService);
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

    @Output('uploadProgress')
    public progress = new EventEmitter<UploadFileInfo>();

    @Output('uploadRemove')
    public remove = new EventEmitter<UploadFileInfo>();

    @Output('uploadComplete')
    public complete = new EventEmitter<UploadFileInfo[]>();

    @Output('uploadStart')
    public start = new EventEmitter<void>();

    @Output('uploadUpdate')
    public update = new EventEmitter<UploadFileInfo[]>();

    @Input()
    public uploadOptionCount: number;

    @HostListener('click', ['$event'])
    onClick($event) {
        this._$selectFile($event);
    }

    @HostListener('mouseenter', ['$event'])
    onMouseEnter() {
        if (!this._$fileInfoList.length) return;
        this.clearCallLater(this._rollOutDenouncesTimer);
        this._addRollInDenouncesTimer();
    }

    @HostListener('mouseleave', ['$event'])
    onMouseLeave() {
        this.clearCallLater(this._rollInDenouncesTimer);
        this._addRollOutDenouncesTimer();
    }

    private _addRollInDenouncesTimer() {
        this._rollInDenouncesTimer = this.callLater(() => {
            if (this._popupInfo) return;
            this._popupInfo = this._popupService.popup(JigsawUploadFileInfoList, this._getUnModalOptions(), this._$fileInfoList);

            if (!this._popupInfo || !this._popupInfo.element || !this._popupInfo.instance) {
                console.error('unable to popup drop down, unknown error!');
                return;
            }

            if (this._popupInfo.instance instanceof JigsawUploadFileInfoList) {
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

    private _getUnModalOptions(): PopupOptions {
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
        this._reCalculatePopupPosition();
    }

    public _$removeFile(file) {
        super._$removeFile(file);
        this._reCalculatePopupPosition();
    }

    private _reCalculatePopupPosition() {
        setTimeout(() => {
            if (this._popupInfo) {
                this._popupService.setPosition(this._getUnModalOptions(), this._popupInfo.element);
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
        <ul class="jigsaw-upload-file-list" [perfectScrollbar]="{wheelSpeed: 0.5, minScrollbarLength: 20}"
            [style.width]="width" [style.maxHeight.px]="optionCount > 0 ? 40*optionCount : ''">
            <li *ngFor="let file of initData" class="jigsaw-upload-file">
                <div class="jigsaw-upload-file-left">
                    <span class="jigsaw-upload-file-icon fa fa-file"></span>
                    <span class="jigsaw-upload-file-name" title="{{file.name}}">{{file.name}}</span>
                </div>
                <div [ngSwitch]="file.state" class="jigsaw-upload-file-right">
                    <ng-container *ngSwitchCase="'pause'">
                        <span>{{'upload.waiting' | translate}}</span>
                        <span class="jigsaw-upload-pause fa fa-pause-circle"></span>
                    </ng-container>
                    <ng-container *ngSwitchCase="'loading'">
                        <span>{{'upload.uploading' | translate}}</span>
                        <span class="jigsaw-upload-loading iconfont iconfont-e8dd jigsaw-am-rotation"></span>
                    </ng-container>
                    <ng-container *ngSwitchCase="'success'">
                        <span>{{'upload.done' | translate}}</span>
                        <span class="jigsaw-upload-success fa fa-check-circle"></span>
                    </ng-container>
                    <ng-container *ngSwitchCase="'error'">
                        <div [title]="file.reason">
                            <span>{{'upload.failed' | translate}}</span>
                            <span class="jigsaw-upload-error fa fa-times-circle"></span>
                        </div>
                    </ng-container>
                </div>
                <span *ngIf="removable" class="jigsaw-upload-file-remove fa fa-trash" (click)="uploader?._$removeFile(file)"></span>
            </li>
        </ul>
    `
})
export class JigsawUploadFileInfoList extends AbstractJigsawComponent implements IPopupable {
    public answer: EventEmitter<ButtonInfo>;
    @Input()
    public initData: UploadFileInfo[];
    @Input()
    public uploader: JigsawUploadDirective;
    @Input()
    public optionCount: number = 5;

    public removable: boolean = true;
}
