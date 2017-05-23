import {AfterContentInit, Component} from "@angular/core";


@Component({
  templateUrl: 'gr.html'
})
export class TimeGrComponent implements AfterContentInit{
    date = "now";

    datas = [{label:"second"},{label:"minute"},{label:"hour"},
        {label:"date"},{label:"week"},{label:"month"}];

    gr

    ngAfterContentInit() {
        this.gr= [this.datas[3]];
    }

    dateChange($event){
       console.log($event);
    }
}

