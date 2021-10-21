import { Component, ChangeDetectionStrategy, OnDestroy, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { AbstractJigsawComponent } from 'jigsaw/common/common';
import { IUploader } from 'jigsaw/common/directive/upload/uploader-typings';
import { JigsawUploadDirective } from 'jigsaw/common/directive/upload/upload.directive';
import { CommonUtils } from 'jigsaw/common/core/utils/common-utils';
import { DragDropInfo } from 'jigsaw/common/directive/dragdrop/types';

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
export class JigsawUpload extends AbstractJigsawComponent implements OnDestroy {
    constructor(
        private _cdr: ChangeDetectorRef,
    ) {
        super();
    }
    @ViewChild("uploadEle", { read: JigsawUploadDirective })
    public uploader: IUploader;

    protected _width: string = "400px";

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
     * @internal
     */
    public _$fileDragEnterHandle(dragInfo: DragDropInfo) {
        console.log("enter")
    }

    /**
     * @internal
     */
    public _$fileDropHandle(dragInfo: DragDropInfo) {
        const fileList = dragInfo.event.dataTransfer.files;
        console.log(fileList)
        this.uploader.appendFiles(fileList);
        // for (let i = 0; i < fileList.length; i++) {
        //     this.uploader.files.push(fileList[i] as any);
        // }
        // this._cdr.markForCheck();
        this.uploader.upload();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}