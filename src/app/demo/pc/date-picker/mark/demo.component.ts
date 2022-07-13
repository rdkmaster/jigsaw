import {Component} from "@angular/core";
import {MarkDate} from "jigsaw/public_api";
import {DatePickerTextService} from "../text.service";

@Component({
    selector: 'mark-date-picker',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DatePickerMarkDemoComponent {
    date;

    markDates: MarkDate[] = [
        {date: 'now-8d', mark: 'error', label: '警告日期'},
        {date: {from: 'now-2d', to: 'now+2d'}, mark: 'recommend', label: '推荐日期'},
        {date: ['now-3d', 'now-5d'], mark: 'warn', label: '提醒日期'},
        {date: {from: 'now+30d', to: 'now+32d'}, mark: 'error', label: '警告日期'},
        {date: {from: 'now-32d', to: 'now-30d'}, mark: 'warn', label: '提醒日期'},
    ];

    constructor(public text: DatePickerTextService) {
    }
}
