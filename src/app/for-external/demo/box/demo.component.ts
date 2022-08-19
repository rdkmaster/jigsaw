import {Component} from "@angular/core";
import {BoxTextService} from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class BoxAllComponent {
    constructor(public doc: BoxTextService) {}
}

