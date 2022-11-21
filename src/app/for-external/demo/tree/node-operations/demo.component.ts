import { Component, ElementRef, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JigsawTreeExt, SimpleTreeData } from "jigsaw/public_api";
import { AsyncDescription } from "../../../template/demo-template/demo-template";


@Component({
    selector: 'tree-node-operations',
    templateUrl: './demo.component.html'
})
export class ZTreeNodeOperationsDemoComponent extends AsyncDescription {
    public demoPath = "demo/tree/node-operations";
    public selectedSize = { size: "medium" };

    @ViewChild(JigsawTreeExt) treeExt: JigsawTreeExt;

    public data: SimpleTreeData;

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.data = new SimpleTreeData();
        this.data.fromObject([
            {
                label: "父节点1 - 展开",
                open: true,
                nodes: [
                    {
                        label: "父节点11 - 展开",
                        open: true,
                        nodes: [
                            { label: "叶子节点111" },
                            { label: "叶子节点112" },
                            { label: "叶子节点113" },
                            { label: "叶子节点114" },
                            { label: "叶子节点115" },
                            { label: "叶子节点116" },
                        ]
                    },
                    {
                        label: "父节点12 - 折叠",
                        nodes: [
                            { label: "叶子节点121" },
                            { label: "叶子节点122" },
                            { label: "叶子节点123" },
                            { label: "叶子节点124" }
                        ]
                    }
                ]
            },
            {
                label: "父节点2 - 折叠",
                nodes: [
                    {
                        label: "父节点21 - 展开", open: true,
                        nodes: [
                            { label: "叶子节点211" },
                            { label: "叶子节点212" },
                            { label: "叶子节点213" },
                            { label: "叶子节点214" }
                        ]
                    },
                    {
                        label: "父节点22 - 折叠",
                        nodes: [
                            { label: "叶子节点221" },
                            { label: "叶子节点222" },
                            { label: "叶子节点223" },
                            { label: "叶子节点224" }
                        ]
                    },
                    {
                        label: "父节点23 - 折叠",
                        nodes: [
                            { label: "叶子节点231" },
                            { label: "叶子节点232" },
                            { label: "叶子节点233" },
                            { label: "叶子节点234" }
                        ]
                    }
                ]
            }
        ])
    }

    public selectNodes() {
        if (this.treeExt && this.treeExt.ztree) {
            let nodes = this.treeExt.ztree.getNodes();
            for (let i = 0; i < nodes[0].nodes[0].nodes.length; i++) {
                this.treeExt.ztree.checkNode(nodes[0].nodes[0].nodes[i], true, true, true);
            }
        }
    }

    public cancelNodes() {
        const selectedNodes = this.treeExt.getCheckedNodes(true);
        if (selectedNodes.length > 0) {
            this.treeExt.checkNode(selectedNodes[selectedNodes.length - 1], false, true);
        }
    }
}
