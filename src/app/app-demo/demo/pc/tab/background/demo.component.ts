import { Component } from "@angular/core";
import {TabTextService} from "../doc.service";

@Component({
    selector: 'tab-background',
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class TabsBackgroundDemoComponent {
    editable: boolean = true;

    show(msg) {
        alert(msg);
    }

    add(tab, content) {
        tab.addTab("new tab", content);
    }

    constructor(public text: TabTextService) {
    }

}
