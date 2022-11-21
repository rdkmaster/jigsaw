import {Component} from "@angular/core";

@Component({
    templateUrl: "./demo.component.html"
})

export class UploadGetFileUrlsComponent {
    public urls: string[];

    uploadComplete($event) {
        this.urls = $event
            .filter(e => e.state == "success")
            .map(f => f.url)
        console.log("uploadComplete触发了", $event)
    }

    summary: string = '本demo展示了`jigsaw-upload`组件如何获取成功上传的文件的数量，以及urls';
    description: string = '';
}
