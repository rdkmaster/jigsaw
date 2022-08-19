import { Component, ViewChild } from "@angular/core";
import { JigsawUpload } from 'jigsaw/public_api';
import {UploadTextService} from "../doc.service";

@Component({
    selector: 'upload-manual-clear',
    templateUrl: './demo.component.html'
})
export class UploadManualClearDemoComponent {
    fileType = '.txt';

    uploadStart($event) {
        console.log("uploadStart触发了", $event)
    }

    uploadProgress($event) {
        console.log("uploadProgress触发了", $event)
    }

    uploadComplete($event) {
        console.log("uploadComplete触发了", $event)
    }

    @ViewChild("demo7", { read: JigsawUpload })
    public uploader7: JigsawUpload;

    constructor(public doc: UploadTextService) {
    }
}
