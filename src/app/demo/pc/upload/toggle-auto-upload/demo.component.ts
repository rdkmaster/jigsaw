import {AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren} from "@angular/core";
import {JigsawUploadDirective, UploadFileInfo, JigsawUploadResult, IUploader} from "jigsaw/public_api";

@Component({ templateUrl: "./demo.component.html",
             styleUrls:["./demo.component.css"] })
export class UploadAutoUploadDemoComponent implements OnInit, AfterViewInit {
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
    ) {}
    public uploadImmediately: boolean = false;

    @ViewChild("first", { read: JigsawUploadDirective })
    public uploader1: IUploader;
    @ViewChild("second", { read: JigsawUploadDirective })
    public uploader2: IUploader;
    @ViewChild("third", { read: JigsawUploadDirective })
    public uploader3: IUploader;

    @ViewChildren(JigsawUploadResult)
    results: QueryList<JigsawUploadResult>;

    public onChange(msg: string, data: UploadFileInfo | UploadFileInfo[]) {
        console.log(msg, "!!!!!!", data);
    }

    multiple: boolean;
    fileType = ".png";
    maxSize: number = 1024;
    minSize: number = 0;

    clear() {
        this.results.toArray().forEach(r => r.clear());
    }

    ngOnInit() {
        console.log(`OnInit, uploader:`, this.uploader1);
    }

    ngAfterViewInit(): void {
        console.log(`AfterViewInit, uploader:`, this.uploader1);
        this._changeDetectorRef.detectChanges();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "这个demo展示了如何通过控制上传指令的`uploadImmediately`属性来控制不同的文件上传方式";
    description: string = "`jigsaw-upload-result`组件是`IUploader`上传结果的可视化显示器，" +
        "它无法独立使用，必须配合实现了IUploader的类来使用";
}
