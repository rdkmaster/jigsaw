import { Component } from "@angular/core";
import { DemoSetBase } from "../../template/demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class NavigationBarAllDemoComponent extends DemoSetBase {
    public demoPath = "demo/navigation-bar";
    public docPath = ['component/JigsawNavigationBar'];
}
