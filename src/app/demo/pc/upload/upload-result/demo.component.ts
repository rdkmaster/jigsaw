import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from "@angular/core";
import {JigsawUploadDirective, UploadFileInfo} from "jigsaw/public_api";

@Component({ templateUrl: "./demo.component.html" })
export class UploadResultDemoComponent implements OnInit, AfterViewInit {
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
    ) {}

    @ViewChild("first", { read: JigsawUploadDirective })
    public uploader1: JigsawUploadDirective;
    @ViewChild("second", { read: JigsawUploadDirective })
    public uploader2: JigsawUploadDirective;
    @ViewChild("third", { read: JigsawUploadDirective })
    public uploader3: JigsawUploadDirective;
    @ViewChild("forth", { read: JigsawUploadDirective })
    public uploader4: JigsawUploadDirective;

    public onChange(msg: string, data: UploadFileInfo | UploadFileInfo[]) {
        console.log(msg, "!!!!!!", data);
    }

    multiple: boolean;
    fileType = ".png";
    maxSize: number = 1024;
    minSize: number = 0;

    clear() {
        this.uploader1.clear();
        this.uploader2.clear();
        this.uploader3.clear();
        this.uploader4.clear();
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
    summary: string = "`jigsaw-upload-result`组件是`jigsaw-upload`指令上传结果的可视化显示器，它无法独立使用，必须配合指令来使用";
    description: string = "";
}
