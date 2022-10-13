import { Component } from "@angular/core";
import { UploadFileInfo } from 'jigsaw/public_api';
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'upload-content-field',
    templateUrl: './demo.component.html'
})
export class UploadContentFieldDemoComponent extends AsyncDescription {
    public demoPath = "demo/upload/content-field";

    public additionalFields = [{ field: 'an-additional-field', value: 'value of the field' }];

    get readAdditionalFields(): { [p: string]: string } {
        const fields = {};
        this.additionalFields.filter(f => !!f.value).forEach(f => fields[f.field] = f.value);
        return fields;
    }

    public addField() {
        this.additionalFields.push({ field: 'new-field', value: '' });
    }

    public onComplete(data: UploadFileInfo | UploadFileInfo[]) {
        console.log(data);
    }
}
