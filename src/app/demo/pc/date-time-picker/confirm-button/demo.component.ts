import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        h4 {
            font-size: 20px;
            margin-bottom: 20px;
        }

        p {
            font-size: 14px;
            margin: 10px 0 20px 0
        }
    `]
})
export class DateTimePickerConfirmButtonDemoComponent {
    showConfirmButton = true;
    date1 = 'now';
    date2 = 'now';
    date3 = 'now';
    beginDate = "now-1d";
    endDate = "now";

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
