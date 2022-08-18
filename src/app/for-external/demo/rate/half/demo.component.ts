import { Component } from "@angular/core";
import { RateTextService } from "../doc.service";

@Component({
    selector: "rate-half",
    templateUrl: 'demo.component.html'
})
export class RateHalfDemoComponent {
    selectedHalfValue = 2.5;
    selectedHalfValue1 = 2.5;
    selectChange(value: any) {
        console.log(value);
    }
    constructor(public text: RateTextService) {
    }
}
