import {AfterViewInit, Directive, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FieldType, FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyWrapperFormField} from './form-field.wrapper';

@NgModule({
    declarations: [FormlyWrapperFormField],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyModule.forChild({
            wrappers: [{
                name: 'form-field',
                component: FormlyWrapperFormField,
            }],
        }),
    ],
})
export class FormlyJigsawFormFieldModule {
}

/**
 * 将组件的实例，挂到to上，这样在应用中，就可以通过fieldConfig对象里面的to属性，拿到该组件的实例了
 */
@Directive()
export abstract class FormlyFieldType<T> extends FieldType implements AfterViewInit {
    protected _instance: T;

    ngAfterViewInit(): void {
        this.to.componentRef = this._instance;
    }
}

