import { AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { JigsawUploadDirective, UploadFileInfo, JigsawUploadResult, IUploader } from "jigsaw/public_api";
import { UploadTextService } from "../doc.service";

@Component({
    selector: 'upload-result-upload',
    templateUrl: "./demo.component.html"
})
export class UploadResultDemoComponent implements OnInit, AfterViewInit {
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

    constructor(private _changeDetectorRef: ChangeDetectorRef, public doc: UploadTextService) { }
}
