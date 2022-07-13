import {Component} from "@angular/core";
import {CascadeTextService} from "./text.service";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ["./public.css"]
})
export class CascadeAllComponent {
    constructor(public text: CascadeTextService) {}
}

