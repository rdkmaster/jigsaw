/**
 * Created by 10177553 on 2017/4/5.
 */
import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {RdkTab} from "../../../../../component/tabs/tab";
import {RdkPane} from "../../../../../component/tabs/tab-pane";

@Component({
    templateUrl: './dynamicTab.html',
    styleUrls: ['dynamicTab.scss'],
    entryComponents: [RdkPane]
})
export class dynamicTabDemoComponent {
    @ViewChild(RdkTab) tabs: RdkTab;

    activeIndex: number = 0;

    constructor() {
    }

    dynamicTabs = [
        {
            label: 'Tab 1',
            content: 'This is the _body of the first tab'
        }, {
            label: 'Tab 2',
            disabled: true,
            content: 'This is the _body of the second tab'
        }, {
            label: 'Tab 3',
            disabled: false,
            content: '<input type="text" value="123"/>'
        }
    ];

    public removeTab(index) {
        this.tabs.removeTab(index);
    }

    public hideTab(index): void {
        this.tabs.hideTab(index);
    }

    public showTab(index): void {
        this.tabs.showTab(index);
    }

    public addTab(tabTitle: string | TemplateRef<any>, tabContent: TemplateRef<any>, initData?: Object) {
        this.tabs.addTab(tabTitle, tabContent, initData)
    }

    public addTabWidthTemplateTitle(tabTitle, tabContent) {
        this.addTab(tabTitle, tabContent, {
            userInfo: {
                username: 'Jerry',
                email: 'ddd@qq.com',
                phoneNumber: '1347559375',
                address: '南京市雨花区软件大道1号'
            }
        })
    }

    public addTabWidthStringTitle(tabContent) {
        this.addTab('added tab', tabContent, {
            userInfo: {
                username: 'Martin',
                email: 'fff@163.com',
                phoneNumber: '1733994499',
                address: '南京市雨花区花神大道6号'
            }
        })
    }

    public addRouterLinkTab(tabTitle, tabContent) {
        this.addTab(tabTitle, tabContent)
    }


}
