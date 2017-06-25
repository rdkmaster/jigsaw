import {AfterContentInit, Component} from "@angular/core";


@Component({
  templateUrl: 'weekStart.html'
})
export class TimeWeekStartComponent implements AfterContentInit{
    date = "now";

    datas = [{label:"sun"},{label:"mon"},{label:"tue"},
        {label:"wed"},{label:"thu"},{label:"fri"},{label:"sat"}];

    weekStart

    ngAfterContentInit() {
        this.weekStart= [this.datas[0]];
    }
}

