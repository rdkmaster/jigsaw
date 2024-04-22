import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {
    JigsawDateTimePickerModule,
    JigsawDateTimeSelectModule,
    JigsawRangeDateTimePickerModule,
    JigsawRangeDateTimeSelectModule,
    JigsawTimePickerModule,
    JigsawTimeSectionModule
} from "@rdkmaster/jigsaw";
import {FormlyJigsawFormFieldModule} from "@rdkmaster/formly/form-field";
import {FormlyFieldTimePicker} from './time-picker.type';
import {FormlyFieldDateTimePicker} from "./date-time-picker.type";
import {FormlyFieldDateTimeSelect} from "./date-time-select.type";
import {FormlyFieldRangeDateTimePicker} from "./range-date-time-picker.type";
import {FormlyFieldRangeDateTimeSelect} from "./range-date-time-select.type";
import {FormlyFieldTimeSection} from "./time-section.type";

@NgModule({
    declarations: [
        FormlyFieldTimePicker, FormlyFieldTimeSection,
        FormlyFieldDateTimePicker, FormlyFieldDateTimeSelect, FormlyFieldRangeDateTimePicker, FormlyFieldRangeDateTimeSelect
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        JigsawTimePickerModule,
        JigsawTimeSectionModule,
        JigsawDateTimePickerModule,
        JigsawDateTimeSelectModule,
        JigsawRangeDateTimePickerModule,
        JigsawRangeDateTimeSelectModule,
        FormlyJigsawFormFieldModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'time-picker',
                    component: FormlyFieldTimePicker,
                    wrappers: ['form-field'],
                },
                {
                    name: 'time-section',
                    component: FormlyFieldTimeSection,
                    wrappers: ['form-field'],
                },
                {
                    name: 'date-time-picker',
                    component: FormlyFieldDateTimePicker,
                    wrappers: ['form-field'],
                },
                {
                    name: 'date-time-select',
                    component: FormlyFieldDateTimeSelect,
                    wrappers: ['form-field'],
                },
                {
                    name: 'range-date-time-picker',
                    component: FormlyFieldRangeDateTimePicker,
                    wrappers: ['form-field'],
                },
                {
                    name: 'range-date-time-select',
                    component: FormlyFieldRangeDateTimeSelect,
                    wrappers: ['form-field'],
                }
            ]
        })
    ]
})
export class FormlyJigsawDateTimeModule {
}
