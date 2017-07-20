import {Component, Renderer2, ViewContainerRef} from "@angular/core";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class TagBasicDemoComponent {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
}

