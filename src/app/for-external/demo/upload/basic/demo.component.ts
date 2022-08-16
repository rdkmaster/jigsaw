import { Component } from "@angular/core";
import {UploadTextService} from "../doc.service";

@Component({
    selector: 'upload-basic',
    templateUrl: './demo.component.html'
})
export class UploadBasicDemoComponent {
    fileType = '.txt';

    uploadStart($event) {
        console.log("uploadStart触发了", $event)
    }

    uploadDataSendProgress($event) {
        console.log("uploadDataSendProgress触发了", $event)
    }

    uploadProgress($event) {
        console.log("uploadProgress触发了", $event)
    }

    uploadComplete($event) {
        console.log("uploadComplete触发了", $event)
    }

    uploadChange($event) {
        console.log("uploadChange触发了", $event)
    }

    uploadRemove($event) {
        console.log("uploadRemove触发了", $event)
    }

    constructor(public text: UploadTextService) {
    }
}
