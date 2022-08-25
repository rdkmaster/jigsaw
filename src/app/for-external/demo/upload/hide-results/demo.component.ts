import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'upload-hide-results',
    templateUrl: './demo.component.html'
})
export class UploadHideResultsDemoComponent extends AsyncDescription {
    public demoPath = "demo/upload/hide-results";

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
