import {Component} from "@angular/core";
import {BoxTextService} from "../doc.service";

@Component({
    selector: 'box-middle-resize-line',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BoxMiddleResizeLineDemoComponent {
    constructor(public doc: BoxTextService) {
    }
}
