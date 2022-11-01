import { Component } from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class BadgeAllComponent extends DemoSetBase {
    public demoPath = "demo/badge";
    public docPath = ['directive/JigsawBadgeDirective'];
}

