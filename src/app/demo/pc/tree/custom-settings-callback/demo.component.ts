import {AfterViewInit, Component, ViewChild} from "@angular/core";


import {SimpleTreeData} from "jigsaw/common/core/data/tree-data";
import {JigsawTreeExt} from "jigsaw/pc-components/tree/tree-ext";
import {ZTreeSettingSetting} from "../../../../../jigsaw/pc-components/tree/ztree-types";

@Component({
    templateUrl: './demo.component.html'
})
export class ZtreeCustomSettingCallbackDemoComponent implements AfterViewInit {
    @ViewChild(JigsawTreeExt) treeExt: JigsawTreeExt;

    public data: SimpleTreeData;
    setting: ZTreeSettingSetting = {
        data: {
            key: {
                children: 'nodes',
                name: 'label'
            }
        },
        edit: {
            enable: true
        },
        callback: {
            onClick: (event, treeId, treeNode) => {
                console.log('custom setting event onclick: click "' + treeNode.label + '" and high light it')
            },
            beforeClick: (treeId, treeNode) => {
                if (treeNode.label == "Cannot Click Node") {
                    console.log('custom setting event beforeClick: stop click "' + treeNode.label + '"')
                    return false;
                }

            },
        }
    };

    beforeClick($event) {
        if ($event.treeNodes.label == "Can Click Node") {
            console.log('event beforeClick:can not stop "' + $event.treeNodes.label + '" be clicked')
            return false;
        }
    }

    constructor() {
        this.data = new SimpleTreeData();
        this.data.fromObject([
            {
                label: "Cannot Click Node",
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
                label: "Can Click Node",
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

        ])
    }


    ngAfterViewInit() {
        if (this.treeExt && this.treeExt.ztree) {
            console.log(this.treeExt.ztree);
            let nodes = this.treeExt.ztree.getNodes();
            if (nodes.length > 0) {
                this.treeExt.ztree.selectNode(nodes[0]);
            }
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawTreeExt.data',
        'JigsawTreeExt.onClick',
    ];
}
