import {
	AfterContentInit, Component, Renderer2, ViewContainerRef
} from "@angular/core";


@Component({
  templateUrl: './app.component.html'
})
export class TimeLimitStartComponent implements AfterContentInit{
    date = "now";

    datas = [{label:"now"},{label:"now-1d"},{label:"now-5d"}];

    limitStart

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    ngAfterContentInit() {
        this.limitStart= [{label:"now"}];
    }
}

