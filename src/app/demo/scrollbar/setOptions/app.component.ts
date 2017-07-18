import {Component} from "@angular/core";

@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class ScrollbarSetOptionsDemoComponent {
    scrollBarOptions: Object = {
        axis:"y",
        theme:"3d",
        snapAmount: 30,
        mouseWheel:{ enable: true, scrollAmount: 30 }
    }
}

