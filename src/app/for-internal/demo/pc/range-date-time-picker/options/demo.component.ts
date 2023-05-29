import { Component, ViewChild } from "@angular/core";
import { JigsawRangeDateTimePicker } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class RangeDatePickerTimeOptionsDemoComponent {
    public beginDate;
    public endDate;

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
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
