import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {JigsawCheckBox} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class CheckBoxBasicDemoComponent implements AfterViewInit {
    @ViewChild('checkBox') _checkBox: JigsawCheckBox;

    ngAfterViewInit(): void {
        /*Promise.resolve().then(() => {
            this._checkBox.checked = true;
        });*/
    }

    _$checked() {
        this._checkBox.checked = !this._checkBox.checked;
    }

    _$disabled() {
        this._checkBox.disabled = !this._checkBox.disabled;
    }
}
