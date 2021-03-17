import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    NgZone
} from "@angular/core";
import { AbstractJigsawComponent } from "jigsaw/common/common";
import { JigsawUploadDirective, UploadFileInfo } from "jigsaw/common/directive/upload/upload.directive";

@Component({
    selector: "jigsaw-upload-panel, j-upload-panel",
    templateUrl: "upload-panel.html",
    host: {
        "[style.width]": "width",
        "[style.height]": "height",
        "[class.jigsaw-upload-panel-host]": "true"
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawUploadPanel extends AbstractJigsawComponent {
    constructor(protected _cdr: ChangeDetectorRef, protected _zone?: NgZone) {
        super(_zone);
    }

    private _uploader: JigsawUploadDirective;

    @Input()
    public get uploader(): JigsawUploadDirective {
        return this._uploader;
    }

    public set uploader(value: JigsawUploadDirective) {
        if (!value) {
            return;
        }
        this._uploader = value;
        this._uploader.update.subscribe(fileData => {
            this._$fileData = [...fileData];
            this._cdr.markForCheck();
        });
    }

    /**
     * @internal
     */
    public _$fileData: UploadFileInfo[] = [];
}
