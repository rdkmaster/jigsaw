import {Component, Renderer2, ViewContainerRef} from "@angular/core";

@Component({
  templateUrl: './app.component.html'
})
export class TimeBasicDemoComponent {
    date = "now";
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
}

