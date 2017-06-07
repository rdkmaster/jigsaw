import { Component } from "@angular/core";
import {TimeGr} from "../../../../../service/time.service";
import {GrItem, Shortcut} from "../../../../../component/time/time";
import {RangeTimeDataRanges} from "../../../../../component/range-time/shortcut-dateranges";


@Component({
  templateUrl: 'grItems.html'
})
export class RangeTimeGrItemsComponent {

    beginDate = "now-1d";

    endDate = "now";


    shortcuts :Shortcut[]= [{label:"My",dateRange:["now-1w","now"]},
                            {label:"这周",dateRange:RangeTimeDataRanges.RecentWeek}];

    grItems :GrItem[]= [
        {label: "Day", value: TimeGr.date, shortcuts:this.shortcuts,span:"2d"},
        {label: "Week", value: TimeGr.week},
        {label: "Month", value: TimeGr.month}];

}

