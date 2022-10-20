import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "rate-half",
    templateUrl: 'demo.component.html'
})
export class RateHalfDemoComponent extends AsyncDescription {
    public demoPath = "demo/rate/half";

    selectedHalfValue = 2.5;
    selectedHalfValue1 = 2.5;
    selectChange(value: any) {
        console.log(value);
    }
}
