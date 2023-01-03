import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class DateTimePickerBasicDemoComponent {
    public date = 'now';

    public dateChange($event) {
        console.log('dateChange==>' + $event)
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
