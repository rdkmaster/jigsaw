import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {JigsawHeader} from "@rdkmaster/jigsaw";
import {FormlyFieldType} from "@ngx-formly/jigsaw/form-field";

@Component({
    selector: 'formly-field-jigsaw-header',
    template: `
        <jigsaw-header
            [formlyAttributes]="field"
            [level]="to.level"
            [theme]="to.theme"
        >{{to.content}}</jigsaw-header>
    `,
    host: {
        '[style.flex]': '1',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldHeader extends FormlyFieldType<JigsawHeader> {
    defaultOptions = {
        templateOptions: {
            content: '标题',
            level:2
        }
    };

    @ViewChild(JigsawHeader)
    protected _instance: JigsawHeader;
}
