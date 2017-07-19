import {
	AfterContentInit, Component, Renderer2, ViewContainerRef
} from "@angular/core";


@Component({
  templateUrl: './app.component.html'
})
export class RangeTimeGrComponent implements AfterContentInit {
    beginDate = "now-1d";

    endDate = "now";

    datas = [{label:"second"},{label:"minute"},{label:"hour"},
        {label:"date"},{label:"week"},{label:"month"}];

    gr

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    ngAfterContentInit() {
        this.gr= [this.datas[3]];
    }

}

