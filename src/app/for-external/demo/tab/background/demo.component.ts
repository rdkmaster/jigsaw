import { Component } from "@angular/core";
import { TabTextService } from "../doc.service";

@Component({
    selector: 'tab-background',
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class TabsBackgroundDemoComponent {
    public editable: boolean = true;

    public show(msg) {
        alert(msg);
    }
    public add(tab, content) {
        tab.addTab("new tab", content);
    }

    constructor(public doc: TabTextService) {
    }
}
