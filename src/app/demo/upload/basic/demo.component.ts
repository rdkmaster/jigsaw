import {Component} from "@angular/core";
import {UploadFileInfo} from "jigsaw/component/upload/upload";

@Component({
    templateUrl: './demo.component.html'
})
export class uploadDemoComponent {
    getUploadFile(fileInfo: UploadFileInfo) {
        console.log(fileInfo);
    }

    getAllUploadFiles(fileInfoList: UploadFileInfo[]) {
        console.log(fileInfoList);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';

}

