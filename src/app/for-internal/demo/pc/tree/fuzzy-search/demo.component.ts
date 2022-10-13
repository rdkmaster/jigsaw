import { Component, ViewChild } from "@angular/core";
import { JigsawTreeExt, SimpleTreeData } from "jigsaw/public_api";
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class ZtreeFuzzySearchComponent {
    @ViewChild('ztree1')
    public treeExt: JigsawTreeExt;
    @ViewChild('ztree2')
    public treeExt2: JigsawTreeExt;

    public data: SimpleTreeData;
    public data2: SimpleTreeData;

    constructor(http: HttpClient) {
        this.data = new SimpleTreeData();
        this.data.http = http;
        this.data.fromAjax("mock-data/tree-data");

        this.data2 = new SimpleTreeData();
        this.data2.fromObject([
            {
                label: "父节点1 - 展开",
                open: true,
                nodes: [
                    {
                        label: "父节点11 - 折叠",
                        nodes: [
                            { label: "叶子节点111", id: 111 },
                            { label: "叶子节点112", id: 112 },
                            { label: "叶子节点113", id: 113 },
                            { label: "叶子节点114", id: 114 }
                        ]
                    },
                    {
                        label: "父节点12 - 折叠",
                        nodes: [
                            { label: "叶子节点121", id: 121 },
                            { label: "叶子节点122", id: 122 },
                            { label: "叶子节点123", id: 123 },
                            { label: "叶子节点124", id: 124 }
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
                            { label: "叶子节点211", id: 211 },
                            { label: "叶子节点212", id: 212 },
                            { label: "叶子节点213", id: 213 },
                            { label: "叶子节点214", id: 214 }
                        ]
                    },
                    {
                        label: "父节点22 - 折叠",
                        nodes: [
                            { label: "叶子节点221", id: 221 },
                            { label: "叶子节点222", id: 222 },
                            { label: "叶子节点223", id: 223 },
                            { label: "叶子节点224", id: 224 }
                        ]
                    },
                    {
                        label: "父节点23 - 折叠",
                        nodes: [
                            { label: "叶子节点231", id: 231 },
                            { label: "叶子节点232", id: 232 },
                            { label: "叶子节点233", id: 233 },
                            { label: "叶子节点234", id: 234 }
                        ]
                    }
                ]
            },
            { label: "父节点3 - 没有子节点", isParent: true }

        ])
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
