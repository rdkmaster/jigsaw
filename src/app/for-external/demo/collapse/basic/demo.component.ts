import { Component } from "@angular/core";
import {CollapseTextService} from "../doc.service";

@Component({
    selector: "collapse-bsaic",
    templateUrl: "./demo.component.html",
})
export class CollapseBasicDemoComponent {
    public _$isActiveChange(isActive: boolean) {
        console.log(isActive);
    }
    public isActive = true;
    constructor(public doc: CollapseTextService) {
    }
}
