import { Component } from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['demo.component.css', './../../assets/demo.common.css']
})
export class DatePickerKeyboardDemoComponent {
    public date;
    public date2;
    public date3;

    public gr = ['date'];

    public dateChange($event) {
        console.log('dateChange=>', $event)
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
