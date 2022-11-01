import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { JigsawUploadDirective, UploadFileInfo, JigsawUploadResult, IUploader } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'upload-upload-result',
    templateUrl: "./demo.component.html"
})
export class UploadResultDemoComponent extends AsyncDescription implements OnInit, AfterViewInit {
    public demoPath = "demo/upload/upload-result";

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

    public multiple: boolean;
    public fileType = ".png";
    public maxSize: number = 1024;
    public minSize: number = 0;

    public clear() {
        this.results.toArray().forEach(r => r.clear());
    }

    ngOnInit() {
        console.log(`OnInit, uploader:`, this.uploader1);
    }

    ngAfterViewInit(): void {
        console.log(`AfterViewInit, uploader:`, this.uploader1);
        this._changeDetectorRef.detectChanges();
    }

    constructor(private _changeDetectorRef: ChangeDetectorRef, http: HttpClient, el: ElementRef) {
        super(http, el);
    }
}
