import { Component } from "@angular/core";
import {TimeGr} from "../../../../../service/time.service";
import {GrItem, ShortCut} from "../../../../../component/time/time";
import {RangeTimeDataRanges} from "../../../../../component/range-time/shortcut-dateranges";


@Component({
  templateUrl: 'grItems.html'
})
export class RangeTimeGrItemsComponent {

    beginDate = "now-1d";

    endDate = "now";


    shortCuts :ShortCut[]= [{label:"My",dateRange:["now-1w","now"]},
                            {label:"这周",dateRange:RangeTimeDataRanges.RecentWeek}];

    grItems :GrItem[]= [
        {label: "Day", value: TimeGr.date, shortCuts:this.shortCuts,span:"2d"},
        {label: "Week", value: TimeGr.week},
        {label: "Month", value: TimeGr.month}];

}

