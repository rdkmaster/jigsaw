import { Component, ViewChild } from "@angular/core";
import { CommonUtils, GrItem, JigsawRangeDateTimePicker, TimeGr } from "jigsaw/public_api";

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
    public limitSpanInput: number = 3;
    public gr = ['date'];
    public showGrItems = false;

    public grItems: GrItem[] = [
        { label: "Day", value: TimeGr.date },
        { label: "Week", value: TimeGr.week },
        { label: "Month", value: TimeGr.month }
    ];

    public limitStart;
    public limitEnd;

    public limitSpan: number | string = this.limitSpanInput;

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

    public limitSpanInputChange($event) {
        if (this.unit == '') {
            this.limitSpan = this.limitSpanInput;
        } else {
            this.limitSpan = CommonUtils.isDefined(this.limitSpanInput) ? this.limitSpanInput + this.unit : undefined;
        }
    }

    public unitChange($event) {
        this.unit = $event == '无' ? '' : $event;
        this.limitSpan = this.limitSpanInput + this.unit;
    }

    public clearLimitSpanInput() {
        this.limitSpanInput = undefined;
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
