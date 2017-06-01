import { Component } from "@angular/core";


@Component({
  templateUrl: 'comboSelect.html'
})
export class ComboSelectDemoComponent {
    date = "now";
    comboValue = [];
    dataChange(event){
        this.comboValue = [{label: event,closable: false},{label: event,closable: false}];
    }
}

