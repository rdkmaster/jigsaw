import { Component } from "@angular/core";
import {TabTextService} from "../doc.service";

@Component({
    selector: 'tab-type',
    templateUrl: "./demo.component.html"
})
export class TabsTypeDemoComponent {
    editable: boolean = true;

    show(msg) {
        alert(msg);
    }

    add(tab, content) {
        tab.addTab("new tab", content);
    }
    constructor(public doc: TabTextService) {
    }
}
