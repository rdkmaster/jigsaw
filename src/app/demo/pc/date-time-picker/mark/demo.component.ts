import {Component} from "@angular/core";
import {MarkDate, MarkDateType} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class DateTimePickerMarkDemoComponent {
    date;

    markDates: MarkDate[] = [
        {date: 'now-8d', mark: MarkDateType.error, label: '警告日期'},
        {date: {from: 'now-2d', to: 'now+2d'}, mark: MarkDateType.recommend, label: '推荐日期'},
        {date: ['now-3d', 'now-5d'], mark: MarkDateType.warn, label: '提醒日期'},
        {date: {from: 'now+30d', to: 'now+32d'}, mark: MarkDateType.error, label: '警告日期'},
        {date: {from: 'now-32d', to: 'now-30d'}, mark: MarkDateType.warn, label: '提醒日期'},
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
