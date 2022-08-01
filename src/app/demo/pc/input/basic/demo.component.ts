import {Component} from "@angular/core";
import {InputTextService} from "../doc.service";

@Component({
    selector: "input-basic",
    templateUrl: './demo.component.html',
})

export class InputBasicComponent {
    public units = ['单位（GB）', '单位（MB）', '单位（KB）'];
    public inputValue: any;
    constructor(public text: InputTextService) {}

}
