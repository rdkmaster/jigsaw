import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { JigsawUploadDirective, UploadFileInfo, JigsawUploadResult, IUploader } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'upload-toggle-auto-upload',
    templateUrl: "./demo.component.html"
})
export class UploadAutoUploadDemoComponent extends AsyncDescription implements OnInit, AfterViewInit {
    public demoPath = "demo/upload/toggle-auto-upload";

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
    public uploadImmediately: boolean = false;

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
