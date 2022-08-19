import { Component } from "@angular/core";
import {CollapseTextService} from "../doc.service";

@Component({
    selector: "collapse-right-arrow",
    templateUrl: "./demo.component.html",
})
export class CollapseRightArrowDemoComponent {
    public _$isActiveChange(isActive: boolean) {
        console.log(isActive);
    }

    public isActive = true;
    public arrowPos = 'right';
    constructor(public doc: CollapseTextService) {
    }
}
