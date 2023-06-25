import { Component, ViewChild } from "@angular/core";
import { GrItem, JigsawRangeDateTimePicker, TimeGr } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css']
})
export class RangeDatePickerTimeOptionsDemoComponent {
    public beginDate;
    public endDate;

    public beginDatePicker;
    public endDatePicker;
    public limitStartPicker;
    public limitEndPicker;

    public grList = ['second', 'minute', 'hour', 'date', 'week', 'month'];
    public units = ['无', 's', 'm', 'h', 'd', 'w', 'M', 'y'];
    public unit = '';
    public limitRangeInput: number;
    public gr = ['date'];
    public showGrItems = false;

    public grItems: GrItem[] = [
        { label: "Day", value: TimeGr.date },
        { label: "Week", value: TimeGr.week },
        { label: "Month", value: TimeGr.month }
    ];

    public limitStart;
    public limitEnd;

    public limitRange: number | string;

    @ViewChild('rangeDateTimePicker')
    private _rangeDateTimePicker: JigsawRangeDateTimePicker;

    public clearable = false;

    public clear() {
        this._rangeDateTimePicker.clearDate();
    };

    public console() {
        console.log(this._rangeDateTimePicker.beginDate, this._rangeDateTimePicker.endDate);
    }

    public change($event) {
        console.log('change=>', $event);
    }

    public grChange($event) {
        console.log('grChange=>', $event);
    }

    public limitRangeInputChange($event) {
        this.limitRange = this.limitRangeInput + this.unit;
    }

    public unitChange($event) {
        this.unit = $event == '无' ? '' : $event;
        this.limitRange = this.limitRangeInput + this.unit;
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
