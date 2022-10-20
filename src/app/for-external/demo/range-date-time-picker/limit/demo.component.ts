import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'range-data-time-picker-limit',
    templateUrl: './demo.component.html'
})
export class RangeDateTimeLimitComponent extends AsyncDescription {
    public demoPath = "demo/range-date-time-picker/limit";

    public beginDate = "now-1d";
    public endDate = "now";
    public limitStart = 'now-5d';
    public limitEnd = 'now+5d';
}
