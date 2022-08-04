import {Component} from '@angular/core';
import {TabTextService} from "../doc.service";

@Component({
    selector: 'tab-editable',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TabsEditableDemoComponent {
    show(msg) {
        alert(msg);
    }

    add(tab, content) {
        tab.addTab('new tab', content);
    }

    constructor(public text: TabTextService) {
    }
}
