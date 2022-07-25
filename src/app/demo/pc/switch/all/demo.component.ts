import {Component} from "@angular/core";
import {SwitchTextService} from "../text.service";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['../public.css']
})
export class SwitchAllComponent {
    constructor(public text: SwitchTextService) {}
}

