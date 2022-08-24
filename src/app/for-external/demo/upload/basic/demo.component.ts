import { Component } from "@angular/core";
import { UploadTextService } from "../doc.service";

@Component({
    selector: 'upload-basic',
    templateUrl: './demo.component.html'
})
export class UploadBasicDemoComponent {
    public fileType = '.txt';

    public uploadStart($event) {
        console.log("uploadStart触发了", $event)
    }

    public uploadDataSendProgress($event) {
        console.log("uploadDataSendProgress触发了", $event)
    }

    public uploadProgress($event) {
        console.log("uploadProgress触发了", $event)
    }

    public uploadComplete($event) {
        console.log("uploadComplete触发了", $event)
    }

    public uploadChange($event) {
        console.log("uploadChange触发了", $event)
    }

    public uploadRemove($event) {
        console.log("uploadRemove触发了", $event)
    }

    constructor(public doc: UploadTextService) {
    }
}
