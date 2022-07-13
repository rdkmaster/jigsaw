import { Component } from "@angular/core";
import {CollapseTextService} from "../text.service";

@Component({
    selector: "basic-collapse",
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class CollapseBasicDemoComponent {
    public _$isActiveChange(isActive: boolean) {
        console.log(isActive);
    }

    public isActive = true;
    public arrowPos: 'left' | 'right' = 'left';

    public _$click() {
        this.isActive = !this.isActive;
    }

    constructor(public text: CollapseTextService) {
    }
}
