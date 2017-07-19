import {Component, Renderer2, ViewContainerRef} from "@angular/core";


@Component({
  templateUrl: './app.component.html'
})
export class RangeTimeBasicDemoComponent {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
    beginDate = "now-1d";
    endDate = "now";
}

