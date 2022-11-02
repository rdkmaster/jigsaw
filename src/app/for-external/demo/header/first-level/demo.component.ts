import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "header-first-level",
    templateUrl: './demo.component.html'
})
export class HeaderFirstLevelComponent extends AsyncDescription {
    public demoPath = "demo/header/first-level";

}
