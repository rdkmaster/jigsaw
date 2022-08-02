import {Component} from "@angular/core";
import {SliderTextService} from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ["./public.css"]
})
export class SliderDemoComponent {
    constructor(public text: SliderTextService) {}
}

