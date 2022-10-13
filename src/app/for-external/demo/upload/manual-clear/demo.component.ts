import { Component, ViewChild } from "@angular/core";
import { JigsawUpload } from 'jigsaw/public_api';
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'upload-manual-clear',
    templateUrl: './demo.component.html'
})
export class UploadManualClearDemoComponent extends AsyncDescription {
    public demoPath = "demo/upload/manual-clear";

    @ViewChild("demo", { read: JigsawUpload })
    public uploader: JigsawUpload;

    public fileType = '.txt';

    public uploadStart($event) {
        console.log("uploadStart触发了", $event)
    }

    public uploadProgress($event) {
        console.log("uploadProgress触发了", $event)
    }

    public uploadComplete($event) {
        console.log("uploadComplete触发了", $event)
    }
}
