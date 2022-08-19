import { Component } from "@angular/core";
import { CheckboxTextService } from "../doc.service";
import { CheckBoxStatus } from "jigsaw/public_api";

@Component({
    selector: "checkbox-minimalist",
    templateUrl: "./demo.component.html",
})

export class CheckboxMinimalistComponent {
    status = CheckBoxStatus.indeterminate;
    mode = ['normal'];
    constructor(public doc: CheckboxTextService) { }

}
