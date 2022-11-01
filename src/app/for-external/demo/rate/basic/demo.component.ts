import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "rate-basic",
    templateUrl: 'demo.component.html'
})
export class RateBasicDemoComponent extends AsyncDescription {
    public demoPath = "demo/rate/basic";

    selectedValue = 3;
    selectedValue1 = 3;
    selectChange(value: any) {
        console.log(value);
    }
}
