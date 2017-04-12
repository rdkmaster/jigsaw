/**
 * Created by 10177553 on 2017/4/5.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {RdkTab} from "../../../../../component/tabs/tab";

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
    `]
})
export class dynamicTabDemoComponent implements OnInit {
    @ViewChild(RdkTab) tabs: RdkTab;

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
    ]

    public deleteTab(value) {
        this.tabs.destroyTabPane(0);
    }
    public deleteTabSec() {
        this.dynamicTabs.splice(0,1);
        this.activeIndex = this.dynamicTabs.length-1;
    }
    public hideTab():void {
        this.tabs.hideTabPane(0);
    }
    public showTab():void {
        this.tabs.showTabPane(0);
    }

    public addTabPane() {
        let length = this.dynamicTabs.length-1;

        this.dynamicTabs.push({
            label: 'new Tab'+length,
            content: 'new Tabs contents ' +length
        })
        this.activeIndex = this.dynamicTabs.length-1;
    }
    ngOnInit() { }
}
