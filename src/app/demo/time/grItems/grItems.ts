import { Component } from "@angular/core";
import {TimeGr} from "jigsaw/service/time.service";


@Component({
  templateUrl: 'grItems.html'
})
export class TimeGrItemsComponent {


    date = new Date();

    grItems = [
        {label: "Day", value: TimeGr.date},
        {label: "Week", value: TimeGr.week},
        {label: "Month", value: TimeGr.month}];

}

