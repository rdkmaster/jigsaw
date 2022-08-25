import { Component } from "@angular/core";
import {AsyncDescription} from "../../demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class DateTimePickerAllComponent extends AsyncDescription {
    public demoPath = "demo/date-time-picker";

}

