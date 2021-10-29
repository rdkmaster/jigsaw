import { Component } from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class UploadBasicDemoComponent {
    fileType = '.txt';

    uploadStart($event) {
        console.log(`uploadStart触发了，${$event}`)
    }

    uploadDataSendProgress($event) {
        console.log(`uploadDataSendProgress触发了，${$event}`)
    }

    uploadProgress($event) {
        console.log(`uploadProgress触发了，${$event}`)
    }

    uploadComplete($event) {
        console.log(`uploadComplete触发了，${$event}`)
    }

    uploadChange($event) {
        console.log(`uploadChange触发了，${$event}`)
    }
    
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo展示了`jigsaw-upload`组件的基本用法';
    description: string = '';
}
