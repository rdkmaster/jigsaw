import {Component} from "@angular/core";
import {CheckboxTextService} from "../text.service";
import {CheckBoxStatus} from "jigsaw/public_api";

@Component({
    selector: "minimalist-checkbox",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class CheckboxMinimalistComponent {
    status = CheckBoxStatus.indeterminate;
    mode = ['normal'];
    constructor(public text: CheckboxTextService) {}

}
