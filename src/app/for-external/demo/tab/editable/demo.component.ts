import { Component } from '@angular/core';
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'tab-editable',
    templateUrl: './demo.component.html'
})
export class TabsEditableDemoComponent extends AsyncDescription {
    public demoPath = "demo/tab/editable";

    public show(msg) {
        alert(msg);
    }

    public add(tab, content) {
        tab.addTab('new tab', content);
    }
}
