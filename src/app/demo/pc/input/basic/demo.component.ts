import {Component} from "@angular/core";
import {InputTextService} from "../text.service";

@Component({
    selector: "basic-input",
    templateUrl: './demo.component.html',
})

export class InputBasicComponent {
    public units = ['单位（GB）', '单位（MB）', '单位（KB）'];
    public inputValue: any;
    public inputValue2: any;
    public inputValue3: any;
    public unit: string;
    constructor(public text: InputTextService) {}

    public unitChange(event: any) {
        console.log('prefix-suffix selected: ', event);
        this.unit = event;
    }
}
