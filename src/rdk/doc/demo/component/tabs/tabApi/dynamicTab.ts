import {Component, TemplateRef, Type, ViewChild} from '@angular/core';
import {RdkTab} from "../../../../../component/tabs/tab";
import {TabContentDefine} from "./tabContent/tabContent";
import {ITabDefine} from "../../../../../component/tabs/tab-item";

@Component({
    templateUrl: './dynamicTab.html',
    styleUrls: ['dynamicTab.scss']
})
export class dynamicTabDemoComponent {
    @ViewChild(RdkTab) tabs: RdkTab;

    public removeTab(index) {
        this.tabs.removeTab(index);
    }

    public hideTab(index): void {
        this.tabs.hideTab(index);
    }

    public showTab(index): void {
        this.tabs.showTab(index);
    }

    public addTab(tabTitle: string | TemplateRef<any>, tabContent: TemplateRef<any> | Type<ITabDefine>, initData?: Object) {
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
        this.addTab('template tab', tabContent, {
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

    public addComponentTab() {
        this.addTab('component tab', TabContentDefine, 'rdk')
    }

}
