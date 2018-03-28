import {Component, Type, ViewChild} from "@angular/core";
import {PopupEffect, PopupInfo, PopupOptions, PopupService} from "jigsaw/service/popup.service";
import {CustomTableComponent} from "../custom-table/demo.component";
import {CustomGraphComponent} from "../custom-graph/demo.component";
import {ComponentMetaData} from "jigsaw/core/data/layout-data";
import {IDynamicInstantiatable} from "jigsaw/component/common";
import {JigsawTab} from "jigsaw/component/tabs/tab";

@Component({
    selector: 'custom-tab',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class CustomTabComponent {

    constructor(private _popupService: PopupService) {

    }

    selectedComponents: ComponentMetaData[];
    componentMetaDataList: ComponentMetaData[] = [
        {
            label: "表格",
            component: CustomTableComponent,
            selector: 'custom-table',
            import: 'CustomTableModule,',
            inputs: [
                {
                    property: 'data',
                    binding: 'tableData',
                },
                {
                    property: 'additionalColumnDefine',
                    binding: 'additionalColumnDefine',
                    default: {
                        a: 1,
                        b: [1, 2, 3],
                        c: 'ww'
                    }
                },
                {
                    property: 'additionalData',
                    binding: 'additionalData',
                    default: {
                        a: 1,
                        b: [1, 2, 3],
                        c: 'ww'
                    }
                }
            ]
        },
        {
            label: "图形",
            component: CustomGraphComponent,
            selector: 'custom-graph',
            import: 'CustomGraphModule,',
            inputs: [
                {
                    property: 'data',
                    binding: 'graphData',
                },
                {
                    property: 'width',
                    binding: 'graphWidth',
                    default: 200
                }
            ]
        },
        {
            label: "tab",
            component: CustomTabComponent,
            selector: 'custom-tab',
            import: 'CustomTabModule,',
            inputs: [
                {
                    property: 'data',
                    binding: 'tableData',
                },
            ]
        },
    ];

    @ViewChild(JigsawTab) tabs: JigsawTab;

    tabsMetaData: ComponentMetaData = {
        selector: 'j-tab',
        component: JigsawTab,
        panes: []
    };

    getMetaDataByComponent(component: Type<IDynamicInstantiatable>): ComponentMetaData{
        return this.componentMetaDataList.find(metadata => metadata.component == component);
    }

    public removeTab(index) {
        this.tabs.removeTab(index);
    }

    public addTab(tabTitle, tabContent, initData) {
        this.tabs.addTab(tabTitle, tabContent, initData)
    }

    public addComponentTab(component: Type<IDynamicInstantiatable>) {
        this.addTab('New tab', component, 'jigsaw');
        this.tabsMetaData.panes.push({
            tile: 'New tab',
            content: this.getMetaDataByComponent(component)
        })
    }

    public removeFirstTab(){
        this.removeTab(0);
        this.tabsMetaData.panes.splice(0, 1);
    }

    selectChange(){
        if (this.dialogInfo) {
            this.dialogInfo.dispose();
        }
        this.addComponentTab(this.selectedComponents[0].component);
    }

    dialogInfo: PopupInfo;

    popupTemplateDialog(tp) {
        this.dialogInfo = this._popupService.popup(tp, this.getModalOptions());
    }

    onAnswer(message: string) {
        if (this.dialogInfo) {
            this.dialogInfo.dispose();
        }
    }

    getModalOptions(): PopupOptions {
        return {
            modal: true, //是否模态
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut
        };
    }
}

