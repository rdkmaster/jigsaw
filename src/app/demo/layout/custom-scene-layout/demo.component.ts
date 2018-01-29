import {Component, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {LayoutData} from "jigsaw/core/data/layout-data";
import {ComponentMetaData} from "jigsaw/component/view-editor/view-editor.type";
import {PopupEffect, PopupInfo, PopupOptions, PopupService} from "jigsaw/service/popup.service";
import {JigsawViewLayout} from "jigsaw/component/view-editor/view-editor";
import {CustomTableComponent} from "./custom-table/demo.component";
import {CustomGraphComponent} from "./custom-graph/demo.component";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CustomSceneLayoutDemoComponent {
    data: LayoutData;
    data2: LayoutData;
    data3: LayoutData;

    constructor(private _popupService: PopupService) {
        this.data = new LayoutData();
        this.data.fromObject([
            {
                grow: 2,
                direction: 'v',
                nodes: [
                    {},
                    {
                        nodes:[
                            {},
                            {}
                        ]
                    }
                ]
            },
            {},
        ]);
        this.data2 = new LayoutData();
        this.data3 = new LayoutData();
    }

    sceneData = [
        {id: 1, label: "场景一",},
        {id: 2, label: "场景二",}
    ];
    selectedScene = this.sceneData[0];

    changeData(scene) {
        if (scene.id == 1) {
            this.data.direction = 'h';
            this.data.fromObject([
                {
                    grow: 2,
                    direction: 'v',
                    nodes: [
                        {},
                        {
                            nodes:[
                                {},
                                {}
                            ]
                        }
                    ]
                },
                {},
            ]);
        } else if (scene.id = 2) {
            this.data.direction = 'v';
            this.data.fromObject([
                {},
                {
                    grow: 2,
                    nodes: [
                        {},
                        {
                            grow: 2
                        }
                    ]
                },
                {},
            ]);
        }
        console.log(this.data);
    }

    consoleData() {
        console.log(this.data2);
    }

    parseData(data) {
        console.log(data);
        console.log(data.toHtml());
        this.data3 = LayoutData.of(data.toHtml(), this.componentMetaDataList);
        console.log(this.data3);
        setTimeout(() => {
            console.log(this.data3.getComponents());
        })
    }

    @ViewChild('dialog') dialog: TemplateRef<any>;
    layout: JigsawViewLayout;

    handleFill(layout: JigsawViewLayout) {
        console.log(layout);
        this.layout = layout;
        this.popupTemplateDialog(this.dialog);
    }

    selectedComponent;
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
                        b: [1,2,3],
                        c: 'ww'
                    }
                },
                {
                    property: 'additionalData',
                    binding: 'additionalData',
                    default: {
                        a: 1,
                        b: [1,2,3],
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
    ];

    dialogInfo: PopupInfo;

    popupTemplateDialog(tp) {
        this.dialogInfo = this._popupService.popup(tp, this.getModalOptions());
    }

    onAnswer(message: string) {
        if (this.dialogInfo) {
            this.dialogInfo.dispose();
        }
    }

    radioChange($event) {
        if (this.dialogInfo) {
            this.dialogInfo.dispose();
        }
        this.layout.addContent([
            {
                component: this.selectedComponent.component,
                selector: this.selectedComponent.selector,
                inputs: this.selectedComponent.inputs
            }
        ]);
    }

    getModalOptions(): PopupOptions {
        return {
            modal: true, //是否模态
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut
        };
    }
}
