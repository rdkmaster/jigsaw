import { Component, ChangeDetectionStrategy, OnDestroy, ViewChild, Input, Renderer2, ElementRef, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IUploader } from '../../common/directive/upload/uploader-typings';
import { JigsawUploadDirective, JigsawUploadBase } from '../../common/directive/upload/upload.directive';
import { DragDropInfo } from '../../common/directive/dragdrop/types';
import { JigsawNotification } from '../notification/notification';
import { CommonUtils } from '../../common/core/utils/common-utils';

@Component({
    selector: "jigsaw-upload, j-upload",
    templateUrl: "upload.html",
    host: {
        "[style.width]": "width",
        "[style.height]": "height",
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
     * @internal
     */
    @ViewChild("uploadEle", { read: JigsawUploadDirective })
    public _$uploader: IUploader;

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
            console.warn(this._translateService.instant(`upload.fileAmountError`));
            this._renderer.removeClass(this._elementRef.nativeElement, "jigsaw-upload-drag-over");
            return;
        }
        this._$uploader.appendFiles(fileList);
        this._$uploader.upload();
        this._renderer.removeClass(this._elementRef.nativeElement, "jigsaw-upload-drag-over");
    }
}
