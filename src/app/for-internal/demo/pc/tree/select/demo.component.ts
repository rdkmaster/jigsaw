import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { SimpleTreeData, JigsawTreeExt } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class ZtreeSelectDemoComponent implements AfterViewInit {
    @ViewChild(JigsawTreeExt) treeExt: JigsawTreeExt;

    public data: SimpleTreeData;

    public selected: any[] = [];

    constructor() {
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
                            { label: "叶子节点114" }
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
                    },
                    { label: "父节点13 - 没有子节点", isParent: true }
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
            },
            { label: "父节点3 - 没有子节点", isParent: true }

        ])
    }

    public onCheck() {
        this.selected = this.treeExt.getCheckedNodes(true);
    }

    public cancelSelected(node) {
        this.treeExt.checkNode(node, false, true);
        this.selected = this.treeExt.getCheckedNodes(true);
    }

    ngAfterViewInit() {
        if (this.treeExt && this.treeExt.ztree) {
            let nodes = this.treeExt.ztree.getNodes();
            if (nodes.length > 0) {
                this.treeExt.ztree.checkNode(nodes[0].nodes[0].nodes[1], true, true, true);
                this.treeExt.ztree.checkNode(nodes[0].nodes[0].nodes[3], true, true, true);
            }
        }

        this.selected = this.treeExt.getCheckedNodes(true);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
