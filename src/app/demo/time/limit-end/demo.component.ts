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
export class TimeLimitEndComponent implements AfterContentInit {
    date = "now";

    datas = [{label: "now"}, {label: "now+1d"}, {label: "now+5d"}];

    limitEnd;

    ngAfterContentInit() {
        this.limitEnd = [{label: "now"}];
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawTime.limitEnd'
    ];
}

