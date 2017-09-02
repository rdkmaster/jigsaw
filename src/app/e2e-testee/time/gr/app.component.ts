import {Component, Renderer2, ViewContainerRef} from "@angular/core";

@Component({
    templateUrl: './app.component.html',
    styles: [`
        h4{font-size: 20px;margin-bottom: 20px;}
        p{font-size: 14px;margin: 10px 0 20px 0}
    `]
})
export class TimeGrComponent {
    date = "now";

    datas = [{label:"second"},{label:"minute"},{label:"hour"},
        {label:"date"},{label:"week"},{label:"month"}];

    gr = [this.datas[2]];

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    dateChange($event){
       console.log($event);
    }
}

