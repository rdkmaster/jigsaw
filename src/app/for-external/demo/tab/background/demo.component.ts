import { Component } from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'tab-background',
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class TabsBackgroundDemoComponent extends AsyncDescription {
    public demoPath = "demo/tab/background";

    public editable: boolean = true;

    public show(msg) {
        alert(msg);
    }
    public add(tab, content) {
        tab.addTab("new tab", content);
    }
}
