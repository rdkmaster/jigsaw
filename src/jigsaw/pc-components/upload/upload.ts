import {ChangeDetectionStrategy, Component, ElementRef, Input, Optional, Renderer2, ViewChild, Output, EventEmitter} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IUploader, UploadFileInfo} from '../../common/directive/upload/uploader-typings';
import {JigsawUploadBase, JigsawUploadDirective} from '../../common/directive/upload/upload.directive';
import {DragDropInfo} from '../../common/directive/dragdrop/types';
import {CommonUtils} from '../../common/core/utils/common-utils';
import {WingsTheme} from "../../common/common";
import { JigsawUploadResult } from './upload-result';

@WingsTheme('upload.scss')
@Component({
    selector: "jigsaw-upload, j-upload",
    templateUrl: "upload.html",
    host: {
        "[style.width]": "width",
        "[style.height]": "height",
        '[attr.data-theme]': 'theme',
        "[class.jigsaw-upload-host]": "true"
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawUpload extends JigsawUploadBase {
    constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        @Optional() private _translateService: TranslateService
    ) {
        super();
    }

    /**
    * 每个文件上传完成（无论成功还是失败）之后发出，此事件给出的进度为文件个数来计算
    */
    @Output()
    public progress = new EventEmitter<UploadFileInfo>();

    /**
     * 每个文件上传过程，服务端接收到客户端发送的数据后发出此事件，此事件给出的进度为单文件数据上传进度
     */
    @Output()
    public dataSendProgress = new EventEmitter<UploadFileInfo>();

    @Output()
    public complete = new EventEmitter<UploadFileInfo[]>();

    @Output()
    public start = new EventEmitter<UploadFileInfo[]>();

    @Output()
    public change = new EventEmitter<UploadFileInfo[]>();

    @Output()
    public remove = new EventEmitter<UploadFileInfo>();

    @Output()
    public retry = new EventEmitter<UploadFileInfo>();

    /**
     * @internal
     */
    @ViewChild("uploadEle", { read: JigsawUploadDirective })
    public _$uploader: IUploader;

    @ViewChild("uploadResultEle", { read: JigsawUploadResult })
    private _uploadResultEle: JigsawUploadResult;

    public get files(): UploadFileInfo[] {
        return this._$uploader.files;
    }

    protected _width: string = "400px";
    protected _minSize: number = 0;
    protected _maxSize: number = 16384;

    /**
     * 宽度
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get width(): string {
        return this._width;
    }

    public set width(value: string) {
        this._width = CommonUtils.getCssValue(value);
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public showResult: boolean = true;

    /**
     * @internal
     */
    public _$fileDragEnterHandle() {
        this._renderer.addClass(this._elementRef.nativeElement, "jigsaw-upload-drag-over");
    }

    /**
     * @internal
     */
    public _$fileDragOverHandle() {
        this._renderer.addClass(this._elementRef.nativeElement, "jigsaw-upload-drag-over");
    }

    /**
     * @internal
     */
    public _$fileDragLeaveHandle(dragInfo: DragDropInfo) {
        let target = dragInfo.event.relatedTarget as HTMLElement;
        const el = CommonUtils.getParentNodeBySelector(target, ".jigsaw-upload-drop-area")
        if (el === null) {
            this._renderer.removeClass(this._elementRef.nativeElement, "jigsaw-upload-drag-over");
        }
    }

    /**
     * @internal
     */
    public _$fileDropHandle(dragInfo: DragDropInfo) {
        const fileList = dragInfo.event.dataTransfer.files;
        if (!this.multiple && fileList.length > 1) {
            this._$uploader.appendFiles(Array.from(fileList)[0]);
            console.warn('Uploader Warning: The number of files is greater than 1');
            this._renderer.removeClass(this._elementRef.nativeElement, "jigsaw-upload-drag-over");
            return;
        }
        if (!this.multiple) {
            this._$uploader.files.splice(0, this.files.length);
        }
        this._$uploader.appendFiles(fileList);
        this._renderer.removeClass(this._elementRef.nativeElement, "jigsaw-upload-drag-over");
        if (this.uploadImmediately) {
            this._$uploader.upload();
        }
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public uploadImmediately: boolean = true;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public offline: boolean = false;

    public upload() {
        this._$uploader.upload();
    }

    public appendFiles(fileList: UploadFileInfo[]) {
        this._$uploader.appendFiles(fileList);
    }

    public retryUpload(file: UploadFileInfo) {
        this._$uploader.retryUpload(file);
    }

    public refresh(){
        this._uploadResultEle._$cdr.markForCheck();
    }

    /**
     * 清空所有已上传的文件
     */
    public clear(){
        this._$uploader.files.splice(0, this.files.length);
        this._uploadResultEle._$cdr.markForCheck();
    }
}
