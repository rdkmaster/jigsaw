import { Component } from "@angular/core";
import {TimeGr} from "../../../../../service/time.service";
import {GrItem, ShortCut} from "../../../../../component/time/time";


@Component({
  templateUrl: 'basic.html'
})
export class RangeTimeBasicDemoComponent {
    beginDate = "now-1d";

    endDate = "now";

    shortCuts :ShortCut[]= [{label:"最近一周",callback:()=>["now-1w","now"]}];

    grItems :GrItem[]= [
        {label: "Day", value: TimeGr.date, shortCuts:this.shortCuts,span:"2d"},
        {label: "Week", value: TimeGr.week},
        {label: "Month", value: TimeGr.month}];
}

