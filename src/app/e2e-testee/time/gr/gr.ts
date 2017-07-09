import {AfterContentInit, Component} from "@angular/core";


@Component({
  templateUrl: 'gr.html'
})
export class TimeGrComponent {
    date = "now";

    datas = [{label:"second"},{label:"minute"},{label:"hour"},
        {label:"date"},{label:"week"},{label:"month"}];

    gr = [this.datas[2]];

    dateChange($event){
       console.log($event);
    }
}

