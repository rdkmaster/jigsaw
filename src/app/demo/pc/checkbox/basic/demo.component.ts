import {Component} from "@angular/core";
import {CheckboxTextService} from "../text.service";
import {CheckBoxStatus} from "jigsaw/public_api";

@Component({
    selector: "basic-checkbox",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class CheckboxBasicComponent {
    public status = CheckBoxStatus.unchecked;
    public enableIndeterminate: boolean = false;
    constructor(public text: CheckboxTextService) {}

}
