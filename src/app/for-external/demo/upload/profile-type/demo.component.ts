import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'upload-profile-type',
    templateUrl: './demo.component.html'
})
export class UploadProfileTypeDemoComponent extends AsyncDescription {
    public demoPath = "demo/upload/profile-type";

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
