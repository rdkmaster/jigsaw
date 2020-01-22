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
export class TimeGrComponent {
    date = "now";

    datas = [{label: "second"}, {label: "minute"}, {label: "hour"},
        {label: "date"}, {label: "week"}, {label: "month"}];

    gr = [this.datas[2]];

    dateChange($event) {
        console.log($event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

