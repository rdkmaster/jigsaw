import { Component } from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class DatePickerAllComponent extends DemoSetBase {
    public demoPath = "demo/date-picker";
    public docPath = ['component/JigsawDatePicker'];
}

