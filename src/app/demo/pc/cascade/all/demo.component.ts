import {Component} from "@angular/core";
import {CascadeTextService} from "../text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class CascadeAllComponent {
    constructor(public text: CascadeTextService) {}
}

