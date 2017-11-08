import {AfterContentInit, Component} from "@angular/core";


@Component({
    templateUrl: './app.component.html',
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
export class TimeLimitStartComponent implements AfterContentInit {
    date = "now";

    datas = [{label: "now"}, {label: "now-1d"}, {label: "now-5d"}];

    limitStart;

    ngAfterContentInit() {
        this.limitStart = [{label: "now"}];
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

