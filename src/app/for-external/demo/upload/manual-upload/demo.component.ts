import { Component, ViewChild } from "@angular/core";
import { JigsawUpload } from 'jigsaw/public_api';
import { UploadTextService } from "../doc.service";

@Component({
    selector: 'upload-manual-upload',
    templateUrl: './demo.component.html'
})
export class UploadManualUploadDemoComponent {
    @ViewChild("demo6", { read: JigsawUpload })
    public uploader6: JigsawUpload;

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

    constructor(public doc: UploadTextService) {
    }
}
