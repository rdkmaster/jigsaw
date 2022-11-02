import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "input-basic",
    templateUrl: './demo.component.html',
})

export class InputBasicComponent extends AsyncDescription {
    public demoPath = "demo/input/basic";

    public units = ['单位（GB）', '单位（MB）', '单位（KB）'];
    public inputValue: any;
}
