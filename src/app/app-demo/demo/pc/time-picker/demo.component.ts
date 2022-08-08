import {Component} from "@angular/core";
import {TimePickerTextService} from "./doc.service";

@Component({
    templateUrl: "demo.component.html"
})
export class TimePickerDemoComponent {
    constructor( public text: TimePickerTextService) {
    }
}
