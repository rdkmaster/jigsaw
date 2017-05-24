/**
 * Created by 10177553 on 2017/4/5.
 */
import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {RdkTab} from "../../../../../component/tabs/tab";
import {RdkPane} from "../../../../../component/tabs/tab-pane";

@Component({
    templateUrl: './dynamicTab.html',
    styles:[ `
        .container {
            border: 1px solid #e9e9e9;
            border-radius: 4px;
            display: inline-block;
            width: 100%;
            position: relative;
            margin: 0 0 16px;
            -webkit-transition: all .2s;
            transition: all .2s;
        }
        .tabBar {
            margin: 10px;
            background-color: #bbbbbb;
        }
    `],
    entryComponents: []
})
export class dynamicTabDemoComponent {
    @ViewChild(RdkTab) tabs: RdkTab;
    @ViewChild('tabTitle2') tabTitle2: TemplateRef<any>;
    @ViewChild('tabContent2') tabContent2: TemplateRef<any>;

    activeIndex: number = 0;

    constructor() { }

    dynamicTabs = [
        {
            label: 'Tab 1',
            content: 'This is the _body of the first tab'
        }, {
            label: 'Tab 2',
            disabled: true,
            content: 'This is the _body of the second tab'
        },{
            label: 'Tab 3',
            disabled: false,
            content: '<input type="text" value="123"/>'
        }
    ];

    public removeTab(index) {
        this.tabs.removeTab(index);
    }
    public hideTab(index):void {
        this.tabs.hideTab(index);
    }
    public showTab(index):void {
        this.tabs.showTab(index);
    }

    public addTab(tabTitle, tabContent) {
        this.tabs.addTab(tabTitle, tabContent)
    }

}
