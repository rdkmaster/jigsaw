import {AfterContentInit, ChangeDetectorRef, Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .header {
            font-size: 20px;
            margin-bottom: 20px;
        }

        .message {
            font-size: 14px;
            margin: 10px 0 20px 0
        }
    `]
})
export class RangeDateTimeWeekStartComponent {
    beginDate = "now-1M";

    endDate = "now";

    weekStart = ['mon'];
    janX = [4];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
