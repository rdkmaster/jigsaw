import { Component } from "@angular/core";
import { CollapseTextService } from "../doc.service";

@Component({
    selector: "collapse-right-arrow",
    templateUrl: "./demo.component.html",
})
export class CollapseRightArrowDemoComponent {
    public isActive = true;
    public arrowPos = 'right';

    public _$isActiveChange(isActive: boolean) {
        console.log(isActive);
    }

    constructor(public doc: CollapseTextService) {
    }
}
