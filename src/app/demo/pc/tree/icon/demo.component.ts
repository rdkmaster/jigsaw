import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { SimpleTreeData, JigsawTreeExt, ZTreeIconSuit } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class ZTreeIconDemoComponent implements AfterViewInit {
    @ViewChild(JigsawTreeExt) treeExt: JigsawTreeExt;

    public data: SimpleTreeData;
    public data2: SimpleTreeData;

    public iconSuit: ZTreeIconSuit = {
        edit: "iconfont-e166",
        remove: "iconfont-e17b",
        open: "iconfont-e9de",
        close: "iconfont-e9db",
        document: "iconfont-e9dc",
        checkboxChecked: "iconfont-ea38",
        checkboxNotCheck: "iconfont-e9f1",
        checkboxHalf: "iconfont-ea25",
        nodeOpen: "iconfont-ea24",
        nodeClose: "iconfont-ea57"
    };

    public iconSuit2: ZTreeIconSuit = {
        edit: "iconfont-e166",
        remove: "iconfont-e17b",
        open: "iconfont-e9de",
        close: "iconfont-e9db",
        document: "iconfont-e9dc",
        nodeOpen: "iconfont-e2b4",
        nodeClose: "iconfont-e2b3"
    };

    public onClick(msg: any) {
        console.log("click");
        console.log(msg);
    }

    constructor() {
        this.data = new SimpleTreeData();
        this.data.fromObject([
            {
                label: "父节点1 - 展开",
                icon: "iconfont-e73f",
                open: true,
                nodes: [
                    {
                        label: "父节点11 - 折叠",
                        icon: "iconfont-e5e2",
                        nodes: [
                            { label: "叶子节点111", icon: "iconfont-e726" },
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
                icon: "iconfont-e5e4",
                nodes: [
                    {
                        label: "父节点21 - 展开",
                        open: true,
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
        ]);
        this.data2 = new SimpleTreeData();
        this.data2.fromObject([
            {
                label: "父节点1 - 展开",
                iconSkin: "iconfont-e722",
                open: true,
                nodes: [
                    {
                        label: "父节点11 - 折叠",
                        iconSkin: "iconfont-e720",
                        nodes: [
                            { label: "叶子节点111", iconSkin: "iconfont-e721" },
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
                iconSkin: "iconfont-e722",
                nodes: [
                    {
                        label: "父节点21 - 展开",
                        open: true,
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
        ]);
    }

    ngAfterViewInit() {
        if (this.treeExt && this.treeExt.ztree) {
            let nodes = this.treeExt.ztree.getNodes();
            if (nodes.length > 0) {
                this.treeExt.ztree.selectNode(nodes[0]);
            }
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
