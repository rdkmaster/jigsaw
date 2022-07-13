import {Component} from "@angular/core";
import {CheckboxTextService} from "../text.service";
import {CheckBoxStatus} from "jigsaw/public_api";

@Component({
    selector: "indeterminate-checkbox",
    templateUrl: "./demo.component.html",
})

export class CheckboxIndeterminateComponent {
    status = CheckBoxStatus.indeterminate;
    constructor(public text: CheckboxTextService) {}

}
