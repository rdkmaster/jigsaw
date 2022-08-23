import { Component } from '@angular/core';
import { TabTextService } from "../doc.service";

@Component({
    selector: 'tab-editable',
    templateUrl: './demo.component.html'
})
export class TabsEditableDemoComponent {
    public show(msg) {
        alert(msg);
    }

    public add(tab, content) {
        tab.addTab('new tab', content);
    }

    constructor(public doc: TabTextService) {
    }
}
