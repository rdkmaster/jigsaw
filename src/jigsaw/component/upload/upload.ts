import {Component, NgModule} from "@angular/core";

@Component({
    selector: 'jigsaw-upload, j-upload',
    templateUrl: 'upload.html',
    host: {
        '[class.jigsaw-upload]': 'true',
    }
})
export class JigsawUpload {

}

@NgModule({
    imports: [],
    declarations: [JigsawUpload],
    exports: [JigsawUpload]
})
export class JigsawUploadModule{

}
