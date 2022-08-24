import { Component } from "@angular/core";
import { UploadTextService } from "../doc.service";

@Component({
    selector: 'upload-set-size',
    templateUrl: './demo.component.html'
})
export class UploadSetSizeDemoComponent {
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
