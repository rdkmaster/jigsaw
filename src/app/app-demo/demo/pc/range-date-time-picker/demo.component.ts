import {Component} from "@angular/core";
import {RangeDataTimePickerTextService} from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class RangeDataTimePickerAllComponent {
    constructor(public text: RangeDataTimePickerTextService) {}
}

