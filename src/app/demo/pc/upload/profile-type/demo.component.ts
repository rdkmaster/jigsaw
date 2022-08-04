import { Component } from "@angular/core";
import {UploadTextService} from "../doc.service";

@Component({
    selector: 'upload-profile-type',
    templateUrl: './demo.component.html'
})
export class UploadProfileTypeDemoComponent {
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

    constructor(public text: UploadTextService) {
    }
}