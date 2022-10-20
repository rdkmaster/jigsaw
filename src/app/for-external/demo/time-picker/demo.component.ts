import { Component } from "@angular/core";
import { DemoSetBase } from "../../demo-template/demo-template";

@Component({
    templateUrl: "demo.component.html"
})
export class TimePickerDemoComponent extends DemoSetBase {
    public demoPath = "demo/time-picker";
    public docPath = ['component/JigsawTimePicker'];
}
