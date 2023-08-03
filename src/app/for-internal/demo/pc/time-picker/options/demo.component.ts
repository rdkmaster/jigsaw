import { Component, ViewChild } from "@angular/core";
import { JigsawTimePicker } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TimePickerOptionsDemoComponent {
    public time;

    @ViewChild('timePicker')
    private _timePicker: JigsawTimePicker;

    public clearable = false;

    public clear() {
        this._timePicker.clearTime();
    };

    public console() {
        console.log(this._timePicker.value);
    }

    public valueChange($event) {
        console.log('valueChange=>', $event);
    }

    public gr = ['time'];

    public limitStartList = ['now-1h', 'now-5h', 'now-10h'];
    public limitEndList = ['now+1h', 'now+5h', 'now+10h'];
    public limitStart = 'now-5h';
    public limitEnd = 'now+5h';
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
