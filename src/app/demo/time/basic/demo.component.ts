import {Component} from "@angular/core";
import {TimeFormatters, TimeGr, TimeService, TimeUnit} from "jigsaw/service/time.service";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        h4 {
            font-size: 20px;
            margin-bottom: 20px;
        }

        h5 {
            font-size: 16px;
            margin-bottom: 10px
        }

        p {
            font-size: 14px;
            margin: 10px 0 20px 0
        }
    `]
})
export class TimeBasicDemoComponent {
    date = "now";

    setDate() {
        // TimeService里面提供了丰富的计算时间的API
        let time = TimeService.addDate(TimeService.getFormatDate('now', TimeGr.second), 30, TimeUnit.m);
        this.date = TimeService.format(time, TimeFormatters.yyyy_mm_dd_hh_mm_ss);
        console.log(this.date);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

