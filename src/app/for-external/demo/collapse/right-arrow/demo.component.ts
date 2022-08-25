import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "collapse-right-arrow",
    templateUrl: "./demo.component.html",
})
export class CollapseRightArrowDemoComponent extends AsyncDescription {
    public demoPath = "demo/collapse/right-arrow";

    public isActive = true;
    public arrowPos = 'right';

    public _$isActiveChange(isActive: boolean) {
        console.log(isActive);
    }
}
