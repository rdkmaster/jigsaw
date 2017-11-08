import {Component} from "@angular/core";

@Component({
    templateUrl: './app.component.html',
    styles: [`
        h4 {
            font-size: 20px;
            margin-bottom: 20px;
        }

        h5 {
            font-size: 16px;
            margin-bottom: 10px;
            line-height: 1.2
        }

        p {
            font-size: 14px;
            margin: 10px 0 20px 0
        }
    `]
})
export class TimeRefreshIntervalComponent {
    date = new Date();

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

