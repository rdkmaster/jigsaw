import {Component} from "@angular/core";

@Component({
  templateUrl: 'setOptions.html',
  styleUrls: ['setOptions.scss']
})
export class ScrollbarSetOptionsDemoComponent {
    scrollBarOptions: Object = {
        axis:"y",
        theme:"3d",
        snapAmount: 30,
        mouseWheel:{ enable: true, scrollAmount: 30 }
    }
}

