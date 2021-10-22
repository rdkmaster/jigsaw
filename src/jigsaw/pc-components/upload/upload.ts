import { Component, ChangeDetectionStrategy, OnDestroy, ViewChild, Input, ChangeDetectorRef, Renderer2, ElementRef } from '@angular/core';
import { AbstractJigsawComponent } from '../../common/common';
import { IUploader } from '../../common/directive/upload/uploader-typings';
import { JigsawUploadDirective, JigsawUploadBase } from '../../common/directive/upload/upload.directive';
import { CommonUtils } from '../../common/core/utils/common-utils';
import { DragDropInfo } from '../../common/directive/dragdrop/types';

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
export class JigsawUpload extends JigsawUploadBase implements OnDestroy {
    constructor(
        protected _renderer: Renderer2,
        protected _elementRef: ElementRef,
    ) {
        super();
    }

    @ViewChild("uploadEle", { read: JigsawUploadDirective })
    public uploader: IUploader;

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
    public _$fileDragEnterHandle(dragInfo: DragDropInfo) {
        this._renderer.addClass(this._elementRef.nativeElement, "jigsaw-upload-drag-over");
    }

    /**
     * @internal
     */
    public _$fileDragOverHandle(dragInfo: DragDropInfo) {
        this._renderer.addClass(this._elementRef.nativeElement, "jigsaw-upload-drag-over");
    }

    /**
     * @internal
     */
    public _$fileDragLeaveHandle(dragInfo: DragDropInfo) {
        this._renderer.removeClass(this._elementRef.nativeElement, "jigsaw-upload-drag-over");
    }

    /**
     * @internal
     */
    public _$fileDropHandle(dragInfo: DragDropInfo) {
        const fileList = dragInfo.event.dataTransfer.files;
        this.uploader.appendFiles(fileList);
        this.uploader.upload();
        this._renderer.removeClass(this._elementRef.nativeElement, "jigsaw-upload-drag-over");
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}