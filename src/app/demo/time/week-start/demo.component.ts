import {AfterContentInit, Component} from "@angular/core";


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
export class TimeWeekStartComponent implements AfterContentInit {
    date = "now";

    datas = [{label: "sun"}, {label: "mon"}, {label: "tue"},
        {label: "wed"}, {label: "thu"}, {label: "fri"}, {label: "sat"}];

    weekStart;

    ngAfterContentInit() {
        this.weekStart = [this.datas[0]];
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

