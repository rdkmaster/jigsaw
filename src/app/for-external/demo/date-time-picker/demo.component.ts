import { Component } from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class DateTimePickerAllComponent extends DemoSetBase {
    public demoPath = "demo/date-time-picker";
    public docPath = ['component/JigsawDateTimePicker'];
}

