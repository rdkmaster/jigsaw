import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'range-date-time-picker-week-start',
    templateUrl: './demo.component.html'
})
export class RangeDateTimeWeekStartComponent extends AsyncDescription {
    public demoPath = "demo/range-date-time-picker/week-start";

    public beginDate = "now-1M";
    public endDate = "now";
}
