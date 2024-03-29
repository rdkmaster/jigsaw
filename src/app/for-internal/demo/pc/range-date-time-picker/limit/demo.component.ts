import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .message {
            font-size: 14px;
            margin: 10px 0 20px 0
        }
    `]
})
export class RangeDateTimeLimitComponent {
    beginDate = "now-1d";
    endDate = "now";
    limitStartList = ['now', 'now-5d', 'now-10d'];
    limitEndList = ['now', 'now+5d', 'now+10d'];
    limitStart = 'now-5d';
    limitEnd = 'now+5d';

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
