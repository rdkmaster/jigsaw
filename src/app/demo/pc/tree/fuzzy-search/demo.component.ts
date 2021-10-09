import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { SimpleTreeData, JigsawTreeExt } from "jigsaw/public_api";
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './demo.component.html'
})
export class ZtreeFuzzySearchComponent implements AfterViewInit {
    @ViewChild(JigsawTreeExt) treeExt: JigsawTreeExt;

    public data: SimpleTreeData;

    constructor(public http: HttpClient) {
        this.data = new SimpleTreeData();
        this.data.http = http;
        this.data.fromAjax("mock-data/tree-data");
    }

    search(value: string): void {
        this.treeExt.fuzzySearch("label", value);
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
}
