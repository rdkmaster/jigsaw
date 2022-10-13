import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'tab-type',
    templateUrl: "./demo.component.html"
})
export class TabsTypeDemoComponent extends AsyncDescription {
    public demoPath = "demo/tab/type";

    public editable: boolean = true;

    public show(msg) {
        alert(msg);
    }
    public add(tab, content) {
        tab.addTab("new tab", content);
    }
}
