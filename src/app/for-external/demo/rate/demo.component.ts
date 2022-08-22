import {Component} from "@angular/core";
import {RateTextService} from "./doc.service";

@Component({
    templateUrl: 'demo.component.html',
})
export  class RateDemoComponent {
    constructor(public doc: RateTextService) {
    }
}
