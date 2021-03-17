import {
    Component,
    ViewChild,
    OnInit,
    AfterViewInit,
    Renderer2,
    ChangeDetectorRef,
    Injector
} from "@angular/core";
import { UploadFileInfo, JigsawUploadDirective } from "jigsaw/public_api";

@Component({ templateUrl: "./demo.component.html" })
export class UploadPanelDemoComponent implements OnInit, AfterViewInit {
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        private _injector: Injector
    ) {}

    @ViewChild("first", { read: JigsawUploadDirective })
    public uploader: JigsawUploadDirective;
    @ViewChild("second", { read: JigsawUploadDirective })
    public uploader2: JigsawUploadDirective;
    @ViewChild("third", { read: JigsawUploadDirective })
    public uploader3: JigsawUploadDirective;
    @ViewChild("forth", { read: JigsawUploadDirective })
    public uploader4: JigsawUploadDirective;

    public updateFileData(fileInfoList: UploadFileInfo[]) {
        console.log("update");
        console.log(fileInfoList);
    }

    multiple: boolean;
    fileType = ".png";
    maxSize: number = 1024;
    minSize: number = 0;

    ngOnInit() {
        console.log(`OnInit, uploader:`, this.uploader);
    }

    ngAfterViewInit(): void {
        console.log(`AfterViewInit, uploader:`, this.uploader);
        this._changeDetectorRef.detectChanges();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "只需要将upload指令实例传给uploader属性即可";
    description: string = "";
}
