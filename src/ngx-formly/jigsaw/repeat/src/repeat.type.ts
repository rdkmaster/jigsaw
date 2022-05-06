import {AfterViewInit, Component} from '@angular/core';
import {FieldArrayType} from '@ngx-formly/core';

@Component({
    selector: 'formly-field-jigsaw-repeat',
    template: `
        <formly-field *ngFor='let f of field.fieldGroup; let i = index;' [field]='f'></formly-field>
    `,
})
export class FormlyFieldRepeat extends FieldArrayType implements AfterViewInit {
    ngAfterViewInit(): void {
        this.to.componentRef = this;
    }
}
