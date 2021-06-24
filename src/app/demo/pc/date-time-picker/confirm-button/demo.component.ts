import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        p {
            font-size: 14px;
            margin: 10px 0 20px 0
        }

        label {
            margin-right: 10px;
            margin-bottom: 0;
        }

        .condition {
            display: flex;
            align-items: center;
            margin: 10px;
        }

        .block {
            display: inline-block;
            margin-right: 30px;
        }
    `]
})
export class DateTimePickerConfirmButtonDemoComponent {
    showConfirmButton = true;
    gr = ['date'];
    date1 = 'now';
    date2 = 'now';
    date3 = {beginDate: 'now-1d', endDate: 'now'};
    beginDate = "now-1d";
    endDate = "now";

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
