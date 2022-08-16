import {Component} from "@angular/core";
import {BoxTextService} from "../doc.service";

@Component({
    selector: 'box-justify',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BoxJustifyDemoComponent {
    direction = 'horizontal';
    directionArr = ['horizontal', 'horizontal-reverse', 'vertical', 'vertical-reverse'];

    justify = 'around';
    justifyArr = ['start', 'end', 'center', 'between', 'around'];

    align = 'center';
    alignArr = ['start', 'end', 'center', 'baseline', 'stretch'];

    constructor(public text: BoxTextService) {
    }
}
