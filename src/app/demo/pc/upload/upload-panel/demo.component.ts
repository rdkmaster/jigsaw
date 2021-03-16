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
    constructor(private _changeDetectorRef: ChangeDetectorRef,
        // @RequireMarkForCheck 需要用到，勿删
        private _injector: Injector) {
}
    @ViewChild(JigsawUploadDirective)
    upload: JigsawUploadDirective;

    public updateFileData(fileInfoList: UploadFileInfo[]) {
        console.log("update");
        console.log(fileInfoList);
    }

    ngOnInit() {
        console.log(`OnInit:${this.upload}`);
    }

    ngAfterViewInit(): void {
        console.log(`AfterViewInit:${this.upload}`);
        this._changeDetectorRef.detectChanges();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "只需要将upload指令实例传给uploader属性即可";
    description: string = "";
}
