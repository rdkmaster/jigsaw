import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "header-level3",
    templateUrl: './demo.component.html'
})
export class HeaderThirdLevelComponent extends AsyncDescription {
    public demoPath = "demo/header/third-level";

}
