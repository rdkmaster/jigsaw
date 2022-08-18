import {Component} from "@angular/core";
import {CheckboxTextService} from "../doc.service";
import {CheckBoxStatus} from "jigsaw/public_api";

@Component({
    selector: "checkbox-checkall",
    templateUrl: "demo.component.html",
    styleUrls: ['demo.component.css']
})
export class CheckboxCheckAllComponent {
    public option = {
        'a': CheckBoxStatus.checked,
        'b': CheckBoxStatus.checked,
        'c': CheckBoxStatus.unchecked,
        'd': CheckBoxStatus.checked,
    }
    public checkAllStatus = CheckBoxStatus.indeterminate;
    public portion: boolean = true;

    public allCheck() {
        this.portion = false;
        if (this.checkAllStatus === CheckBoxStatus.checked) {
            // tslint:disable-next-line:forin
            for (const type in this.option) {
                this.option[type] = CheckBoxStatus.checked
            }
            console.log(this.checkAllStatus)
        } else if (this.checkAllStatus === CheckBoxStatus.unchecked) {
            // tslint:disable-next-line:forin
            for (const type in this.option) {
                this.option[type] = CheckBoxStatus.unchecked
            }
        }
    }

    public checkStatus() {
        this.portion = true;
        let hasChecked = false;
        let hasUnChecked = false;
        for (const type in this.option) {
            if (this.option.hasOwnProperty(type)) {
                this.option[type] === CheckBoxStatus.checked ? hasChecked = true : hasUnChecked = true;
            }
        }
        if (hasChecked && hasUnChecked) {
            this.checkAllStatus = CheckBoxStatus.indeterminate
            return;
        } else if (hasChecked && !hasUnChecked) {
            this.checkAllStatus = CheckBoxStatus.checked
            return;
        } else if (!hasChecked && hasUnChecked) {
            this.checkAllStatus = CheckBoxStatus.unchecked
            return;
        }
    }

    constructor(
        public text: CheckboxTextService
    ) {
        this.checkStatus()
    }
}