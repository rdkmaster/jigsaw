import {AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren} from "@angular/core";
import {JigsawUploadDirective, UploadFileInfo, JigsawUploadResult, IUploader} from "jigsaw/public_api";
import {UploadTextService} from "../text.service";

@Component({
    selector: 'toggle-auto-upload-upload',
    templateUrl: "./demo.component.html",
    styleUrls:["./demo.component.css"]
})
export class UploadAutoUploadDemoComponent implements OnInit, AfterViewInit {
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        public text: UploadTextService
    ) {}
    public uploadImmediately: boolean = false;

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
}
