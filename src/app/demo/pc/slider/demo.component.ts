import {Component} from "@angular/core";
import {SliderTextService} from "./text.service";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ["./public.css"]
})
export class SliderAllComponent {
    constructor(public text: SliderTextService) {}
}

