import {AfterContentInit, Component} from "@angular/core";


@Component({
  templateUrl: './app.component.html'
})
export class RangeTimeLimitStartComponent implements AfterContentInit{
    beginDate = "now-1d";

    endDate = "now";

    datas = [{label:"now"},{label:"now-1d"},{label:"now-5d"}];

    limitStart

    ngAfterContentInit() {
        this.limitStart= [{label:"now"}];
    }
}

