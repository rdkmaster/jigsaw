import {AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren} from "@angular/core";
import {JigsawUploadDirective, UploadFileInfo, JigsawUploadResult, IUploader} from "jigsaw/public_api";

@Component({ templateUrl: "./demo.component.html" })
export class UploadShowDateDemoComponent implements AfterViewInit {
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
    ) {}

    @ViewChild("first", { read: JigsawUploadDirective })
    public uploader1: IUploader;

    @ViewChildren(JigsawUploadResult)
    results: QueryList<JigsawUploadResult>;

    public onChange(msg: string, data: UploadFileInfo | UploadFileInfo[]) {
        console.log(msg, "!!!!!!", data);
    }

    public showDate:boolean = true;

    clear() {
        this.results.toArray().forEach(r => r.clear());
    }

    ngAfterViewInit(): void {
        console.log(`AfterViewInit, uploader:`, this.uploader1);
        this._changeDetectorRef.detectChanges();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "`jigsaw-upload`指令实现了`IUploader`接口，" +
        "它可以与`jigsaw-upload-result`组件配合使用，作为`jigsaw-upload`指令的结果可视化显示器。";
    description: string = "`jigsaw-upload-result`组件是`IUploader`上传结果的可视化显示器，" +
        "它无法独立使用，必须配合实现了IUploader的类来使用";
}
