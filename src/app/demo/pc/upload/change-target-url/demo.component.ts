import { AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { JigsawUploadDirective, UploadFileInfo, JigsawUploadResult, IUploader } from "jigsaw/public_api";

@Component({ templateUrl: "./demo.component.html", styleUrls: ["./demo.component.css"] })
export class ChangeTargetUrlDemoComponent implements OnInit, AfterViewInit {
    constructor(private _changeDetectorRef: ChangeDetectorRef) {}
    public uploadImmediately: boolean = false;

    @ViewChild("first", { read: JigsawUploadDirective })
    public uploader1: IUploader;
    @ViewChild("second", { read: JigsawUploadDirective })
    public uploader2: IUploader;

    @ViewChildren(JigsawUploadResult)
    results: QueryList<JigsawUploadResult>;

    public onChange(msg: string, data: UploadFileInfo | UploadFileInfo[]) {
        console.log(msg, "!!!!!!", data);
    }

    multiple: boolean;
    fileType = ".png";
    maxSize: number = 1024;
    minSize: number = 0;

    toBeChangedUrl = "/rdk/service/common";
    uploadConfirm() {
        this.toBeChangedUrl = "/rdk/service/common/upload";
        this.uploader1.upload();
    }

    toBeChangedUrl2 = "/rdk/service/common";
    editTargetUrl(){
        this.toBeChangedUrl2 = "/rdk/service/common/upload";
    }

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
    summary: string = "这个demo复现了在动态修改目标URL时上传指令的一个问题";
    description: string;
}
