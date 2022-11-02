import { Component } from "@angular/core";
import { MarkDate } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'date-picker-mark',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DatePickerMarkDemoComponent extends AsyncDescription {
    public demoPath = "demo/date-picker/mark";

    public date;
    public markDates: MarkDate[] = [
        { date: 'now-8d', mark: 'error', label: '警告日期' },
        { date: { from: 'now-2d', to: 'now+2d' }, mark: 'recommend', label: '推荐日期' },
        { date: ['now-3d', 'now-5d'], mark: 'warn', label: '提醒日期' },
        { date: { from: 'now+30d', to: 'now+32d' }, mark: 'error', label: '警告日期' },
        { date: { from: 'now-32d', to: 'now-30d' }, mark: 'warn', label: '提醒日期' },
    ];
}
