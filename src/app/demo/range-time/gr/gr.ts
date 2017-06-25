import {AfterContentInit, Component} from "@angular/core";


@Component({
  templateUrl: 'gr.html'
})
export class RangeTimeGrComponent implements AfterContentInit{
    beginDate = "now-1d";

    endDate = "now";

    datas = [{label:"second"},{label:"minute"},{label:"hour"},
        {label:"date"},{label:"week"},{label:"month"}];

    gr

    ngAfterContentInit() {
        this.gr= [this.datas[3]];
    }

}

