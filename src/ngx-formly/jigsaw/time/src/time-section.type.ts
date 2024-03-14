import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@rdkmaster/formly/form-field";
import {JigsawTimeSection} from '@rdkmaster/jigsaw';

@Component({
    selector: 'formly-field-jigsaw-time-section',
    template: `
        <jigsaw-time-section
            [formlyAttributes]="field"
            [formControl]="formControl"
            [width]="to.width"
            [height]="to.height"
            [(value)]="to.value"
            [showLastDay]="to.showLastDay"
            [currentTime]="to.currentTime"
            [layout]="to.layout"
            [showHour]="to.showHour"
            [showWeek]="to.showWeek"
            [showDate]="to.showDate"
            [multipleHour]="to.multipleHour"
            [multipleDate]="to.multipleDate"
            [theme]="to.theme"
            (valueChange)="to.valueChange && to.valueChange($event)"
        ></jigsaw-time-section>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldTimeSection extends FormlyFieldType<JigsawTimeSection> {
    defaultOptions = {
        templateOptions: {
            layout: 'vertical',
            showHour: true,
            showWeek: true,
            showDate: true,
            multipleHour: true,
            multipleDate: true,
        },
    };

    @ViewChild(JigsawTimeSection)
    protected _instance: JigsawTimeSection;
}
