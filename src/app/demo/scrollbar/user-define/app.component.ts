import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {ScrollEvent} from "jigsaw/directive/scrollbar/scrollbar";

@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class ScrollbarUserdefineDemoComponent {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    public testScrollEvent(message:ScrollEvent){
        console.log("scroll is move:"+ message.draggerTop);
    }

    public testScrollStart(message:ScrollEvent){
        console.log("scroll is start:"+ message.direction);
    }

    public testScrollInit(message:ScrollEvent){
        console.log("scroll is init:");
    }
}

