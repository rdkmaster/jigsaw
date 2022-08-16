import {Component} from "@angular/core";
import {RateTextService} from "../doc.service";

@Component({
    selector: "rate-basic",
    templateUrl: 'demo.component.html',
    styleUrls: ['demo.component.css']
})
export class RateBasicDemoComponent {
    selectedValue = 3;
    selectedValue1 = 3;
    selectChange(value: any) {
        console.log(value);
    }
    constructor(public text: RateTextService) {
    }
}
