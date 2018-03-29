import {Component, ComponentRef, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {ComponentMetaData, LayoutData} from "jigsaw/core/data/layout-data";
import {PopupEffect, PopupInfo, PopupOptions, PopupService} from "jigsaw/service/popup.service";
import {JigsawEditableBox} from "jigsaw/component/box/editable-box";
import {CustomGraphComponent} from "./custom-graph/demo.component";
import {CustomTableComponent} from "./custom-table/demo.component";
import {JigsawTabsWrapper} from "jigsaw/component/box/tabs-wrapper/tabs-wrapper";

export const GlobalComponentMetaDataList: ComponentMetaData[] = [
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
        component: JigsawTabsWrapper,
        selector: 'custom-tab',
        import: 'CustomTabModule,',
        inputs: [
            {
                property: 'data',
                binding: '123',
            },
        ]
    },
];

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
                        nodes: [
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
                            nodes: [
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
    currentEditableBox: JigsawEditableBox;
    currentWrapper: any;
    currentMode: 'box' | 'wrapper';

    handleFill(box: JigsawEditableBox) {
        console.log(box);
        this.currentEditableBox = box;
        this.popupTemplateDialog(this.dialog);
        this.currentMode = 'box';
    }

    handleWrapperFill(wrapper: any) {
        this.currentWrapper = wrapper;
        this.popupTemplateDialog(this.dialog);
        this.currentMode = 'wrapper';
    }

    handleResizeStart(boxes: JigsawEditableBox[]) {
        boxes.forEach(box => {
            console.log(box.element);
        });
    }

    handleResize(boxes: JigsawEditableBox[]) {
        boxes.forEach(box => {
            if (box.data.components instanceof Array) {
                box.data.components.forEach((component: ComponentRef<any>) => {
                    if (component.instance instanceof CustomGraphComponent) {
                        component.instance.resize();
                    }
                })
            }
        })
    }

    handleAddAndRemove() {
        setTimeout(() => {
            let e = document.createEvent("Event");
            e.initEvent("resize", true, true);
            window.dispatchEvent(e);
        })
    }

    selectedComponent;
    componentMetaDataList: ComponentMetaData[] = GlobalComponentMetaDataList;

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
        // 复制一遍，避免操作同一对象
        const componentMetaData = {
            component: this.selectedComponent.component,
            selector: this.selectedComponent.selector,
            inputs: this.selectedComponent.inputs
        };
        if (this.currentMode == 'box') {
            this.currentEditableBox.addContent([componentMetaData]);
        } else if (this.currentMode == 'wrapper') {
            if (this.currentWrapper instanceof JigsawTabsWrapper) {
                this.currentWrapper.addTab(componentMetaData);
            }
        }
    }

    getModalOptions(): PopupOptions {
        return {
            modal: true, //是否模态
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut
        };
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个DEMO稍乱了一些，但是它很好的演示了`j-editable-box`的各个功能';
    description: string = '';
    tags: string[] = [
        'JigsawEditableBox',
        'LayoutData'
    ];
}
