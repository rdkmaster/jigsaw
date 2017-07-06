import { Component } from "@angular/core";
import {TimeGr} from "jigsaw/service/time.service";
import {GrItem, Shortcut} from "jigsaw/component/time/time";
import {RangeTimeDataRanges} from "jigsaw/component/range-time/shortcut-dateranges";


@Component({
  templateUrl: 'grItems.html'
})
export class RangeTimeGrItemsComponent {

    beginDate = "now-1d";

    endDate = "now";


    shortcuts :Shortcut[]= [{label:"自定义",dateRange:["now-15d","now"]},
                            {label:"这周",dateRange:RangeTimeDataRanges.RecentWeek}];

    grItems :GrItem[]= [
        {label: "Day", value: TimeGr.date, shortcuts:this.shortcuts,span:"15d"},
        {label: "Week", value: TimeGr.week},
        {label: "Month", value: TimeGr.month}];

}

