import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "header-level1",
    templateUrl: './demo.component.html'
})
export class HeaderFirstLevelComponent extends AsyncDescription {
    public demoPath = "demo/header/first-level";

}
