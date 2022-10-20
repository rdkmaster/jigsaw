import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'box-justify',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BoxJustifyDemoComponent extends AsyncDescription {
    public demoPath = "demo/box/justify";

    public direction = 'horizontal';
    public directionArr = ['horizontal', 'horizontal-reverse', 'vertical', 'vertical-reverse'];

    public justify = 'around';
    public justifyArr = ['start', 'end', 'center', 'between', 'around'];

    public align = 'center';
    public alignArr = ['start', 'end', 'center', 'baseline', 'stretch'];
}
