import { Component, OnInit, ViewChild } from "@angular/core";
import { SimpleTreeData, JigsawTreeExt } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TreeSaveOpenStatusDemoComponent implements OnInit {
    @ViewChild(JigsawTreeExt) treeExt: JigsawTreeExt;

    public data: SimpleTreeData;
    public saveOpenStatus: boolean = true;
    private _index = 0;
    private _originalData: string;

    private _treeObj = [
        {
            label: "父节点1 - 展开",
            open: true,
            nodes: [
                {
                    label: "父节点11 - 折叠",
                    nodes: [
                        { label: "叶子节点111", chkDisabled: true },
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
    ]

    public _$changeData() {
    }

    public _$addNodes() {
        this._treeObj.push({ label: `新增节点 - ${++this._index}`, isParent: this._index % 3 === 0 })
        this.data.fromObject(this._treeObj);
    }

    public _$resetData() {
        this._treeObj = JSON.parse(this._originalData);
        this._index = 0;
        this.data.fromObject(this._treeObj);
    }

    ngOnInit(): void {
        this._originalData = JSON.stringify(this._treeObj);
        this.data = new SimpleTreeData();
        this._$resetData();
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
