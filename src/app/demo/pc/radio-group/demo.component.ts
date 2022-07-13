import {Component} from "@angular/core";
import {RadioTextService} from "./text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class RadioAllComponent {
    constructor(public text: RadioTextService) {}
}

