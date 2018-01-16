import {Component, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {LayoutData} from "jigsaw/core/data/tree-data";
import {ComponentMetaData} from "jigsaw/component/view-editor/view-editor.type";
import {BasicGraphComponent} from "../../graph/basic/app.component";
import {TableBasicDemoComponent} from "../../table/basic/app.component";
import {PopupEffect, PopupInfo, PopupOptions, PopupService} from "../../../../jigsaw/service/popup.service";
import {JigsawViewLayout} from "jigsaw/component/view-editor/view-editor";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class customSceneLayoutDemoComponent {
    data: LayoutData;
    data2: LayoutData;
    data3: LayoutData;

    constructor(private _popupService: PopupService) {
        this.data = new LayoutData();
        this.data.fromObject([
            {
                direction: 'v',
                nodes: [
                    {
                        nodes: [
                            {},
                            {
                                direction: 'v',
                                nodes: [
                                    {},
                                    {},
                                ]
                            }
                        ]
                    },
                    {
                        grow: 2,
                        nodes: [
                            {},
                            {},
                            {},
                        ]
                    }
                ]
            },
            {
                grow: '3'
            },
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
                    direction: 'v',
                    nodes: [
                        {
                            nodes: [
                                {},
                                {
                                    direction: 'v',
                                    nodes: [
                                        {},
                                        {},
                                    ]
                                }
                            ]
                        },
                        {
                            grow: 2,
                            nodes: [
                                {},
                                {},
                                {},
                            ]
                        }
                    ]
                },
                {
                    grow: '3'
                },
            ]);
        } else if (scene.id = 2) {
            this.data.direction = 'v';
            this.data.fromObject([
                {},
                {
                    grow: 4,
                    nodes: [
                        {},
                        {
                            grow: 4
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
        console.log(data.toString());
        this.data3 = LayoutData.of(data.toString(), this.componentMetaDataList);
        console.log(this.data3);
        setTimeout(() => {
            console.log(this.data3.getComponents());
        }, 2000)
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
            component: TableBasicDemoComponent,
            selector: 'custom-table',
            import: 'TableBasicDemoModule,',
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
            component: BasicGraphComponent,
            selector: 'custom-graph',
            import: 'BasicGraphModule,',
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
