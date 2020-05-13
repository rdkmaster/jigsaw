import {Component} from "@angular/core";
import {MarkDate, MarkDateType} from "../../../../../jigsaw/pc-components/date-picker/date-picker";

@Component({
    templateUrl: './demo.component.html'
})
export class DatePickerMarkDemoComponent {
    date;

    markDates: MarkDate[] = [
        {date: 'now-8d', mark: MarkDateType.error},
        {date: {from: 'now-2d', to: 'now+2d'}, mark: MarkDateType.recommend},
        {date: ['now-3d', 'now-5d'], mark: MarkDateType.warn},
        {date: {from: 'now+30d', to: 'now+32d'}, mark: MarkDateType.error},
        {date: {from: 'now-32d', to: 'now-30d'}, mark: MarkDateType.warn},
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

