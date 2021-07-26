import {Component, OnInit} from '@angular/core';

@Component({
    templateUrl: "./demo.component.html"
})
export class JigsawTabsWithNgForComponent {
    tabDatas = [{label: "Tab1", value:'open'}, {label: "Tab2", value: 'open'}, {label: "Tab3", value: 'close'}];
    headless = false;
    selectedIndex = 0;

    testEvent() {
        console.info("tab页点击");
    }

    changeTabData(e) {
        e.preventDefault();
        e.stopPropagation();
        this.tabDatas[2].value = this.tabDatas[2].value == 'open' ? 'close' : 'open';
        this.selectedIndex = this.tabDatas[2].value == 'open' ? 2 : 0;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
