import {Component} from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'numeric-input-basic',
    templateUrl: './demo.component.html'
})
export class NumericInputBasicDemoComponent extends AsyncDescription {
    public demoPath = "demo/numeric-input/basic";
    public selectedSize = {size: "default"};

    public value: number;

    public valueChange($event) {
        console.log($event, typeof $event == 'number');
    }
}
