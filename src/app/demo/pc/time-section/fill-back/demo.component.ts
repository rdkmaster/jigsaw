import {Component} from "@angular/core";
import {ArrayCollection, TimeSectionValue} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TimeSectionFillBackDemoComponent {
    timeSectionValue: TimeSectionValue = {
        time: ['00:00-01:00', '05:00-06:00', '18:00-19:00'],
        date: [{value: 2}, {value: 4}],
        everyday: true
    };
    value: string  = JSON.stringify(this.timeSectionValue, null, '  ');

    onChange() {
        try {
            this.timeSectionValue = JSON.parse(this.value);
        } catch (e) {
            alert('解析组件值出错啦');
        }
    }

    onTimeSectionChange(value: TimeSectionValue) {
        const v: TimeSectionValue = {time: [...value.time], everyday: !!value.everyday};
        if (value.date) {
            v.date = value.date.map(date => ({value: date.value}));
        }
        if (value.week) {
            v.week = value.week.map(week => ({value: week.value}));
        }
        this.value = JSON.stringify(v, null, '  ');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
