import { Component, ViewChild } from "@angular/core";
import { JigsawDatePicker } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css']
})
export class DatePickerOptionsDemoComponent {
    public date;
    public clearOnReselect = true;

    @ViewChild('datePicker')
    private _datePicker: JigsawDatePicker;

    public clearable = false;

    public clear() {
        this._datePicker.clearDate();
    };

    public console() {
        console.log(this._datePicker.date);
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
