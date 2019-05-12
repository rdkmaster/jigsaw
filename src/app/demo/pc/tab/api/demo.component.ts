import {Component, ViewChild} from '@angular/core';
import {JigsawTab} from "jigsaw/pc-components/tabs/tab";
import {TabContentDefine} from "./tabContent/tabContent";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DynamicTabDemoComponent {
    @ViewChild(JigsawTab) tabs: JigsawTab;

    public removeTab(index) {
        this.tabs.removeTab(index);
    }

    public hideTab(index): void {
        this.tabs.hideTab(index);
    }

    public showTab(index): void {
        this.tabs.showTab(index);
    }

    public addTab(tabTitle, tabContent, initData?: Object) {
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

    public addComponentTab() {
        this.addTab('component tab', TabContentDefine, 'jigsaw')
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawTab.addTab',
        'JigsawTab.removeTab',
        'JigsawTab.showTab',
        'JigsawTab.hideTab',
    ];
}
