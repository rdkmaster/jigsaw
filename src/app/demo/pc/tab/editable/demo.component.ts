import {Component} from '@angular/core';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TabsEditableDemoComponent {
    editable: boolean = true;

    show(msg) {
        alert(msg);
    }

    add(tab, content) {
        tab.addTab('new tab', content);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '此demo主要展示可编辑的tab';
    description: string = '';
}
