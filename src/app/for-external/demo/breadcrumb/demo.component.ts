import { Component } from "@angular/core";
import {DemoSetBase} from "../../demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class BreadcrumbAllComponent extends DemoSetBase {
    public demoPath = "demo/breadcrumb";

}

