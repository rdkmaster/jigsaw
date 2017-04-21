import {Component} from "@angular/core";
import {TreeData} from "../../../../../component/ztree/ztreeExt"
@Component({
    template: `
        <rdk-tree-ext [(setting)]="setting1" [(data)]="data1"
                      (onClick)="onClick($event)"
                      (beforeExpand)="beforeExpand($event)"
                      (onDblClick)="onDblClick($event)"
                      (beforeCollapse)="beforeCollapse($event)"
                      (beforeRename)="beforeRename($event)"
        ></rdk-tree-ext>
        <rdk-tree-ext [(setting)]="setting2" [(data)]="data2"></rdk-tree-ext>
        <br/>
    `
})
export class ZtreeDemoComponent {
    public setting1 = {};
    public data1: TreeData[] = [
        {
            label: "父节点1 - 展开",
            open: true,
            nodes: [
                {
                    label: "父节点11 - 折叠",
                    nodes: [
                        {label: "叶子节点111"},
                        {label: "叶子节点112"},
                        {label: "叶子节点113"},
                        {label: "叶子节点114"}
                    ]
                },
                {
                    label: "父节点12 - 折叠",
                    nodes: [
                        {label: "叶子节点121"},
                        {label: "叶子节点122"},
                        {label: "叶子节点123"},
                        {label: "叶子节点124"}
                    ]
                },
                {label: "父节点13 - 没有子节点", isParent: true}
            ]
        },
        {
            label: "父节点2 - 折叠",
            nodes: [
                {
                    label: "父节点21 - 展开", open: true,
                    nodes: [
                        {label: "叶子节点211"},
                        {label: "叶子节点212"},
                        {label: "叶子节点213"},
                        {label: "叶子节点214"}
                    ]
                },
                {
                    label: "父节点22 - 折叠",
                    nodes: [
                        {label: "叶子节点221"},
                        {label: "叶子节点222"},
                        {label: "叶子节点223"},
                        {label: "叶子节点224"}
                    ]
                },
                {
                    label: "父节点23 - 折叠",
                    nodes: [
                        {label: "叶子节点231"},
                        {label: "叶子节点232"},
                        {label: "叶子节点233"},
                        {label: "叶子节点234"}
                    ]
                }
            ]
        },
        {label: "父节点3 - 没有子节点", isParent: true}

    ];

    public setting2 = {
        data: {
            key: {
                children: 'nodes',
                name: 'label'
            }
        },
        view: {
            fontCss: this.getFont,
            nameIsHTML: true
        }

    };

    public getFont(treeId, node) {
        return node.font ? node.font : {};
    }

    public data2: TreeData[] = [{
        label: "父节点1 - 展开",
        open: true,
        font: {'font-weight': 'bold', 'color': 'red'},
        nodes: [
            {
                label: "父节点11 - 折叠", font: {'font-weight': 'bold'},
                nodes: [
                    {label: "叶子节点111", font: {'font-weight': 'bold'}},
                    {label: "叶子节点112", font: {'font-weight': 'bold'}},
                    {label: "叶子节点113", font: {'font-weight': 'bold'}},
                    {label: "叶子节点114", font: {'font-weight': 'bold'}}
                ]
            },
            {
                label: "父节点12 - 折叠", font: {'font-weight': 'bold'},
                nodes: [
                    {label: "叶子节点121", font: {'font-weight': 'bold'}},
                    {label: "叶子节点122", font: {'font-weight': 'bold'}},
                    {label: "叶子节点123", font: {'font-weight': 'bold'}},
                    {label: "叶子节点124", font: {'font-weight': 'bold'}}
                ]
            },
            {label: "父节点13 - 没有子节点", isParent: true, font: {'font-weight': 'bold'}}
        ]
    }];

    public beforeExpand(msg: any) {
        console.log("beforeExpand");
        console.log(msg);
    }

    public beforeCollapse(msg: any) {
        console.log("beforeCollapse");
        console.log(msg);
    }

    public onClick(msg: any) {
        console.log("click");
        console.log(msg);
    }

    public onDblClick(msg: any) {
        console.log("onDblClick");
        console.log(msg);
    }

    public beforeRename(msg: any) {
        console.log("onDblClick");
        console.log(msg);
    }


    constructor() {

        setTimeout(() => {
            this.data1 = [
                {
                    label: "父节点1 - 展开",
                    open: true,
                    nodes: [
                        {
                            label: "父节点11 - 折叠",
                            nodes: [
                                {label: "叶子节点111"},
                                {label: "叶子节点112"},
                                {label: "叶子节点113"},
                                {label: "叶子节点114"}
                            ]
                        },
                        {
                            label: "父节点12 - 折叠",
                            nodes: [
                                {label: "叶子节点121"},
                                {label: "叶子节点122"},
                                {label: "叶子节点123"},
                                {label: "叶子节点124"}
                            ]
                        },
                        {label: "父节点13 - 没有子节点", isParent: true}
                    ]
                }

            ];
        }, 5000);
    }
}
