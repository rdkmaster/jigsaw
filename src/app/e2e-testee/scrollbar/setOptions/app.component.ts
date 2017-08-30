import {Component, Renderer2, ViewContainerRef} from "@angular/core";

@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class ScrollbarSetOptionsDemoComponent {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
    scrollBarOptions: Object = {
        axis:"y",
        theme:"3d",
        snapAmount: 30,
        mouseWheel:{ enable: true, scrollAmount: 30 }
    }
}

