import { Component } from "@angular/core";
import { DemoSetBase } from "../../demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class NavigationMenuAllDemoComponent extends DemoSetBase {
    public demoPath = "demo/navigation-menu";
    public docPath = ['component/JigsawNavigationMenu'];
}
