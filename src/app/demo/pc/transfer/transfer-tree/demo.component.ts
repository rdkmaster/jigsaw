import { Component } from "@angular/core";
import { SimpleTreeData, TransferListTargetRenderer, TransferTreeSourceRenderer } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TransferTreeDemoComponent {

    public sourceRenderer = TransferTreeSourceRenderer;
    public targetRenderer = TransferListTargetRenderer;

    constructor() {
        this.data = new SimpleTreeData();
        this.data.fromObject([
            {
                label: "父节点1 - 展开",
                open: true,
                nodes: [
                    {
                        label: "父节点11 - 折叠",
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

    data: SimpleTreeData;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
