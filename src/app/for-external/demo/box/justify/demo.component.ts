import { Component } from "@angular/core";
import { BoxTextService } from "../doc.service";

@Component({
    selector: 'box-justify',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BoxJustifyDemoComponent {
    public direction = 'horizontal';
    public directionArr = ['horizontal', 'horizontal-reverse', 'vertical', 'vertical-reverse'];

    public justify = 'around';
    public justifyArr = ['start', 'end', 'center', 'between', 'around'];

    public align = 'center';
    public alignArr = ['start', 'end', 'center', 'baseline', 'stretch'];

    constructor(public doc: BoxTextService) {
    }
}
