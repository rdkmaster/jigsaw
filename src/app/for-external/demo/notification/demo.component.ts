import { Component } from "@angular/core";
import {DemoSetBase} from "../../template/demo-template/demo-template";

@Component({
    templateUrl: "demo.component.html",
})
export class NotificationDemoComponent extends DemoSetBase {
    public demoPath = "demo/notification";
    public docPath = ['component/JigsawNotification'];
}
