import {AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren} from "@angular/core";
import {JigsawUploadDirective, UploadFileInfo, JigsawUploadResult, IUploader} from "jigsaw/public_api";
import {UploadTextService} from "../text.service";

@Component({
    selector: 'upload-result-upload',
    templateUrl: "./demo.component.html"
})
export class UploadResultDemoComponent implements OnInit, AfterViewInit {
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        public text: UploadTextService
    ) {}

    @ViewChild("first", { read: JigsawUploadDirective })
    public uploader1: IUploader;
    @ViewChild("second", { read: JigsawUploadDirective })
    public uploader2: IUploader;
    @ViewChild("third", { read: JigsawUploadDirective })
    public uploader3: IUploader;
    @ViewChild("forth", { read: JigsawUploadDirective })
    public uploader4: IUploader;

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
    summary: string = "`jigsaw-upload`指令实现了`IUploader`接口，" +
        "它可以与`jigsaw-upload-result`组件配合使用，作为`jigsaw-upload`指令的结果可视化显示器。";
    description: string = "`jigsaw-upload-result`组件是`IUploader`上传结果的可视化显示器，" +
        "它无法独立使用，必须配合实现了IUploader的类来使用";
}
