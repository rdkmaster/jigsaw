import {Component} from "@angular/core";
import {RadioTextService} from "./text.service";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./public.css']
})
export class RadioAllComponent {
    constructor(public text: RadioTextService) {}
}

