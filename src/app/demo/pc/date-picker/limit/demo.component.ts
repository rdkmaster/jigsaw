import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .live-demo-wrap h4 {
            font-size: 20px;
            margin-bottom: 20px;
        }

        .live-demo-wrap p {
            font-size: 14px;
            margin: 10px 0 20px 0
        }
    `]
})
export class DatePickerLimitComponent {
    date1 = "now";
    limitStartList = ['now-1d', 'now-5d', 'now-10d'];
    limitEndList = ['now', 'now+5d', 'now+10d'];
    limitStart = 'now-10d';
    limitEnd = 'now+5d';

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
