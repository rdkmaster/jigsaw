import {Component} from "@angular/core";
import { UploadFileInfo } from 'jigsaw/public_api';
import {UploadTextService} from "../text.service";

@Component({
    selector: 'content-field-upload',
    templateUrl: './demo.component.html',
    styles: [`
        .field-label {
            width: 137px;
            margin-bottom: 16px;
            text-align: right;
        }
    `]
})
export class UploadContentFieldDemoComponent {
    additionalFields = [{field: 'an-additional-field', value: 'value of the field'}];

    get readAdditionalFields(): { [p: string]: string } {
        const fields = {};
        this.additionalFields.filter(f => !!f.value).forEach(f => fields[f.field] = f.value);
        return fields;
    }

    addField() {
        this.additionalFields.push({field: 'new-field', value: ''});
    }

    public onComplete(data: UploadFileInfo | UploadFileInfo[]) {
        console.log(data);
    }

    constructor(public text: UploadTextService) {
    }
}
