import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "header-level2",
    templateUrl: './demo.component.html'
})
export class HeaderSecondLevelComponent extends AsyncDescription {
    public demoPath = "demo/header/second-level";

}
