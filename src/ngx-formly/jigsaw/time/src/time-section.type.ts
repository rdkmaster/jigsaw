import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';
import {TimeGr} from '@rdkmaster/jigsaw';

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
            (valueChange)="to.valueChange && to.valueChange($event)"
        ></jigsaw-time-section>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldTimeSection extends FieldType {
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
}
