import {Component} from "@angular/core";
import {CascadeTextService} from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class CascadeAllComponent {
    constructor(public text: CascadeTextService) {}
}

