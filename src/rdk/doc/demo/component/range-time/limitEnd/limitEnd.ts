import {AfterContentInit, Component} from "@angular/core";


@Component({
  templateUrl: 'limitEnd.html'
})
export class RangeTimeLimitEndComponent implements AfterContentInit{
    beginDate = "now-1d";

    endDate = "now";

    datas = [{label:"now"},{label:"now+1d"},{label:"now+5d"}];

    limitEnd

    ngAfterContentInit() {
        this.limitEnd = [{label:"now"}];
    }
}

