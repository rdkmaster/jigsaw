import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "collapse-basic",
    templateUrl: "./demo.component.html",
})
export class CollapseBasicDemoComponent extends AsyncDescription {
    public demoPath = "demo/collapse/basic";

    public isActive = true;
    public _$isActiveChange(isActive: boolean) {
        console.log(isActive);
    }
}
