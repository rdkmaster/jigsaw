import { Component } from "@angular/core";
import { SimpleTreeData, TransferListTargetRenderer, TransferTreeSourceRenderer, ArrayCollection, listOption } from "jigsaw/public_api";

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
                        label: "父节点11 - 展开",
                        open: true,
                        nodes: [
                            { label: "叶子节点111", id: 1 },
                            { label: "叶子节点112", id: 2 },
                            { label: "叶子节点113", id: 3 },
                            { label: "叶子节点114", id: 4 }
                        ]
                    },
                    {
                        label: "父节点12 - 折叠",
                        nodes: [
                            { label: "叶子节点121", id: 5 },
                            { label: "叶子节点122", id: 6 },
                            { label: "叶子节点123", id: 7 },
                            { label: "叶子节点124", id: 8 }
                        ]
                    }
                ]
            },
            {
                label: "父节点2 - 折叠",
                nodes: [
                    {
                        label: "父节点21 - 展开",
                        open: true,
                        nodes: [
                            { label: "叶子节点211", id: 9 },
                            { label: "叶子节点212", id: 10 },
                            { label: "叶子节点213", id: 11 },
                            { label: "叶子节点214", id: 12 }
                        ]
                    },
                    {
                        label: "父节点22 - 折叠",
                        nodes: [
                            { label: "叶子节点221", id: 13 },
                            { label: "叶子节点222", id: 14 },
                            { label: "叶子节点223", id: 15 },
                            { label: "叶子节点224", id: 16 }
                        ]
                    },
                    {
                        label: "父节点23 - 折叠",
                        nodes: [
                            { label: "叶子节点231", id: 17 },
                            { label: "叶子节点232", id: 18 },
                            { label: "叶子节点233", id: 19 },
                            { label: "叶子节点234", id: 20 }
                        ]
                    }
                ]
            },
            {
                label: "父节点3 - 折叠",
                nodes: []
            }
        ])

        this.selectedData = new ArrayCollection([
            { label: "叶子节点112", id: 2 },
            { label: "叶子节点114", id: 4 }
        ]);
    }

    data: SimpleTreeData;
    selectedData: ArrayCollection<listOption>;


    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
