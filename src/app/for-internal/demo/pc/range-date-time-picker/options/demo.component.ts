import { Component, ViewChild } from "@angular/core";
import { JigsawRangeDateTimePicker } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css']
})
export class RangeDatePickerTimeOptionsDemoComponent {
    public beginDate;
    public endDate;

    public grList = ['second', 'minute', 'hour', 'date', 'week', 'month'];
    public gr = ['date'];

    public limitStartList = ['now', 'now-5d', 'now-10d'];
    public limitEndList = ['now', 'now+5d', 'now+10d'];
    public limitStart = 'now-5d';
    public limitEnd = 'now+5d';

    public limitRange:number;

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
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
