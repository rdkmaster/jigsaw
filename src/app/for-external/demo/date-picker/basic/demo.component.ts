import { Component } from "@angular/core";
import { AsyncDescription } from 'app/for-external/demo-template/demo-template';

@Component({
    selector: 'date-picker-basic',
    templateUrl: './demo.component.html'
})
export class DatePickerBasicDemoComponent extends AsyncDescription {
    public demoPath = "demo/date-picker/basic";

    public date;
}
