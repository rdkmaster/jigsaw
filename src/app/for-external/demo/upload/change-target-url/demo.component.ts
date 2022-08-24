import { AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { JigsawUploadDirective, UploadFileInfo, JigsawUploadResult, IUploader } from "jigsaw/public_api";
import { UploadTextService } from "../doc.service";

@Component({
    selector: 'upload-change-target-url',
    templateUrl: "./demo.component.html"
})
export class ChangeTargetUrlDemoComponent implements OnInit, AfterViewInit {
    @ViewChild("first", { read: JigsawUploadDirective })
    public uploader1: IUploader;
    @ViewChild("second", { read: JigsawUploadDirective })
    public uploader2: IUploader;
    @ViewChildren(JigsawUploadResult)
    public results: QueryList<JigsawUploadResult>;

    public uploadImmediately: boolean = false;

    public multiple: boolean;
    public fileType = ".png";
    public maxSize: number = 1024;
    public minSize: number = 0;

    public toBeChangedUrl1 = "/rdk/service/common";
    public uploadConfirm() {
        this.toBeChangedUrl1 = "/rdk/service/common/upload";
        this.uploader1.upload();
    }

    public toBeChangedUrl2 = "/rdk/service/common";
    public editTargetUrl() {
        this.toBeChangedUrl2 = "/rdk/service/common/upload";
    }

    public clear() {
        this.results.toArray().forEach(r => r.clear());
    }

    public onChange(msg: string, data: UploadFileInfo | UploadFileInfo[]) {
        console.log(msg, "!!!!!!", data);
    }

    ngOnInit() {
        console.log(`OnInit, uploader:`, this.uploader1);
    }

    ngAfterViewInit(): void {
        console.log(`AfterViewInit, uploader:`, this.uploader1);
        this._changeDetectorRef.detectChanges();
    }

    constructor(private _changeDetectorRef: ChangeDetectorRef, public doc: UploadTextService) { }
}
