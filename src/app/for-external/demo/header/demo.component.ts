import { Component } from "@angular/core";
import {AsyncDescription} from "../../demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class HeaderDemoComponent extends AsyncDescription {
    public demoPath = "demo/header";

}
