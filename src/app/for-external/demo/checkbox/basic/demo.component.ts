import { Component } from "@angular/core";
import { CheckboxTextService } from "../doc.service";
import { CheckBoxStatus } from "jigsaw/public_api";

@Component({
    selector: "checkbox-basic",
    templateUrl: "./demo.component.html",
})

export class CheckboxBasicComponent {
    public demo1checked = CheckBoxStatus.checked;
    public demo1indeterminate = CheckBoxStatus.indeterminate;
    public demo1unchecked = CheckBoxStatus.unchecked;
    public demo2checked = CheckBoxStatus.checked;
    public demo2indeterminate = CheckBoxStatus.indeterminate;
    public demo2unchecked = CheckBoxStatus.unchecked;

    constructor(public doc: CheckboxTextService) {
    }
}
