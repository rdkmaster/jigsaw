import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'upload-profile-type',
    templateUrl: './demo.component.html'
})
export class UploadProfileTypeDemoComponent extends AsyncDescription {
    public demoPath = "demo/upload/profile-type";

    public urls: string[];

    public uploadStart($event) {
        console.log("uploadStart触发了", $event)
    }

    public uploadProgress($event) {
        console.log("uploadProgress触发了", $event)
    }

    public uploadComplete($event) {
        this.urls = $event
            .filter(e => e.state == "success")
            .map(f => f.url);
        console.log("uploadComplete触发了", $event)
    }
}
