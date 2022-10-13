import { Component } from "@angular/core";
import { CheckBoxStatus } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "checkbox-basic",
    templateUrl: "./demo.component.html",
})

export class CheckboxBasicComponent extends AsyncDescription {
    public demoPath = "demo/checkbox/basic";

    public demo1checked = CheckBoxStatus.checked;
    public demo1indeterminate = CheckBoxStatus.indeterminate;
    public demo1unchecked = CheckBoxStatus.unchecked;
    public demo2checked = CheckBoxStatus.checked;
    public demo2indeterminate = CheckBoxStatus.indeterminate;
    public demo2unchecked = CheckBoxStatus.unchecked;
}
