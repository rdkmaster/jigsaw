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
                label: "父节点a - 展开",
                open: true,
                nodes: [
                    {
                        label: "父节点aa - 折叠",
                        nodes: [
                            { label: "叶子节点aaa", id: 111 },
                            { label: "叶子节点aab", id: 112 },
                            { label: "叶子节点aac", id: 113 },
                            { label: "叶子节点aad", id: 114 }
                        ]
                    },
                    {
                        label: "父节点ab - 折叠",
                        nodes: [
                            { label: "叶子节点aba", id: 121 },
                            { label: "叶子节点abb", id: 122 },
                            { label: "叶子节点abc", id: 123 },
                            { label: "叶子节点abd", id: 124 }
                        ]
                    },
                    { label: "父节点ac - 没有子节点", isParent: true }
                ]
            },
            {
                label: "父节点b - 折叠",
                nodes: [
                    {
                        label: "父节点ba - 展开", open: true,
                        nodes: [
                            { label: "叶子节点baa", id: 211 },
                            { label: "叶子节点bab", id: 212 },
                            { label: "叶子节点bac", id: 213 },
                            { label: "叶子节点bad", id: 214 }
                        ]
                    },
                    {
                        label: "父节点bb - 折叠",
                        nodes: [
                            { label: "叶子节点bba", id: 221 },
                            { label: "叶子节点bbb", id: 222 },
                            { label: "叶子节点bbc", id: 223 },
                            { label: "叶子节点bbd", id: 224 }
                        ]
                    },
                    {
                        label: "父节点bc - 折叠",
                        nodes: [
                            { label: "叶子节点bca", id: 231 },
                            { label: "叶子节点bcb", id: 232 },
                            { label: "叶子节点bcc", id: 233 },
                            { label: "叶子节点bcd", id: 234 }
                        ]
                    }
                ]
            },
            { label: "父节点c - 没有子节点", isParent: true }

        ])
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
