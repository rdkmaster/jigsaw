import {Component} from "@angular/core";
import {CheckboxTextService} from "./text.service";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./public.css']
})
export class CheckboxAllComponent {
    constructor(public text: CheckboxTextService) {}
}

