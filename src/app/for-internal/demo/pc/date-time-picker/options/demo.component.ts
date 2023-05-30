import { Component, ViewChild } from "@angular/core";
import { JigsawDatePicker } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DatePickerTimeOptionsDemoComponent {
    public date;

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
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
