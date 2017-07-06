import {Component} from "@angular/core";
import {ScrollEvent} from "jigsaw/component/scrollbar/scrollbar";

@Component({
  templateUrl: 'user-define.html',
  styleUrls: ['user-define.css']
})
export class ScrollbarUserdefineDemoComponent {
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

