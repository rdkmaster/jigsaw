import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'upload-basic',
    templateUrl: './demo.component.html'
})
export class UploadBasicDemoComponent extends AsyncDescription {
    public demoPath = "demo/upload/basic";

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
}
