import { Component, ViewChild } from "@angular/core";
import { JigsawDatePicker } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css']
})
export class DatePickerTimeOptionsDemoComponent {
    public date;
    public clearOnReClick = true;

    @ViewChild('dateTimePicker')
    private _dateTimePicker: JigsawDatePicker;

    public clearable = false;

    public clear() {
        this._dateTimePicker.clearDate();
    };

    public console() {
        console.log(this._dateTimePicker.date);
    }

    public dateChange($event) {
        console.log('dateChange=>', $event);
    }

    public gr = ['second'];

    public limitStartList = ['now-1d', 'now-5d', 'now-10d', 'now-3h'];
    public limitEndList = ['now', 'now+5d', 'now+10d', 'now+3h'];
    public limitStart = 'now-10d';
    public limitEnd = 'now+5d';
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
