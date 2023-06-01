import {Component, ViewChild} from "@angular/core";
import {SimpleTreeData, JigsawTreeExt} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class ZtreeBigDataDemoComponent {
    @ViewChild(JigsawTreeExt) treeExt: JigsawTreeExt;

    public parent: number = 10;
    public child: number = 200;

    public data: SimpleTreeData;

    constructor() {
        this.data = new SimpleTreeData();
        this.updateData();
    }

    public updateData() {
        const data = [];

        for (let i = 0; i < this.parent; i++) {
            const parent = {
                label: `父节点${i + 1}`,
                nodes: []
            };
            for (let j = 0; j < this.child; j++) {
                const child = {
                    label: `叶子节点${i + 1}${j}`
                };
                parent.nodes.push(child);
            }
            data.push(parent);
        }

        this.data.fromObject(data);
    }

    public expandAll() {
        this.treeExt.ztree.expandAll(true);
    }

    public collapseAll() {
        this.treeExt.ztree.expandAll(false);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
