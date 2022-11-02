import { Component } from "@angular/core";
import { CheckBoxStatus } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "checkbox-minimalist",
    templateUrl: "./demo.component.html",
})

export class CheckboxMinimalistComponent extends AsyncDescription {
    public demoPath = "demo/checkbox/minimalist";

    public status = CheckBoxStatus.indeterminate;
}
