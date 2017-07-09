import {AfterContentInit, Component} from "@angular/core";


@Component({
  templateUrl: 'limitEnd.html'
})
export class TimeLimitEndComponent implements AfterContentInit{
    date = "now";

    datas = [{label:"now"},{label:"now+1d"},{label:"now+5d"}];

    limitEnd

    ngAfterContentInit() {
        this.limitEnd = [{label:"now"}];
    }
}

