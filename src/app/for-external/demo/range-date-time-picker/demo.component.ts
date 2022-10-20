import { Component } from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class RangeDataTimePickerAllComponent extends DemoSetBase {
    public demoPath = "demo/range-date-time-picker";
    public docPath = ['component/JigsawRangeDateTimePicker'];
}

