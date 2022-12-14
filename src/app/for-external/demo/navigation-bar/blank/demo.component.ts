import { Component } from "@angular/core";
import { AsyncDescription } from "../../../template/demo-template/demo-template";

@Component({
    selector: "navigation-bar-blank",
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.scss"]
})
export class NavigationBarBlankDemoComponent extends AsyncDescription {
    public demoPath = "demo/navigation-bar/blank";
}
