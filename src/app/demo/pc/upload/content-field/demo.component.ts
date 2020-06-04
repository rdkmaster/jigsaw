import {Component} from "@angular/core";

@Component({
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

    get readAdditionalFields() {
        const fields = {};
        this.additionalFields.filter(f => !!f.value).forEach(f => fields[f.field] = f.value);
        return fields;
    }

    addField() {
        this.additionalFields.push({field: 'new-field', value: ''});
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了如何设置数据字段名和文件名字段名';
    description: string = `
        不同的服务器可以接受的数据字段名可能会各不相同，Web上必须使用对应的字段名才能让传输过去的数据被服务器接受。
        此外，对于原文件名如果包含汉字，服务端收到的文件名将出现乱码，为了解决这个问题，Jigsaw将原文件名使用uri编码后，
        作为第二个字段传输给服务端，服务端可以读取第二个字段的值并做uri解码来得到正确的文件名，传输文件名的第二个字段是可选的。
        
        关于默认值：
        - contentField的默认值是file
        - fileNameField的默认值是filename
        
        最后，如果你的服务端是一个非常老的rdk服务端，则必须将第二个字段名清空，以确保数据能够正常的上传给这些rdk服务端。
    `;

}
