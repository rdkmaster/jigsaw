import {Component} from "@angular/core";
import {CheckboxTextService} from "../text.service";
import {CheckBoxStatus} from "jigsaw/public_api";

@Component({
    selector: "disabled-checkbox",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class CheckboxDisabledComponent {
    status = CheckBoxStatus.checked;
    enabled: boolean;
    constructor(public text: CheckboxTextService) {}

}
