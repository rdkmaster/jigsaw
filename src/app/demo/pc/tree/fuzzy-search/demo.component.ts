import {Component, ViewChild} from "@angular/core";
import {JigsawTreeExt, SimpleTreeData} from "jigsaw/public_api";
import {HttpClient} from '@angular/common/http';

@Component({
    templateUrl: './demo.component.html'
})
export class ZtreeFuzzySearchComponent {
    @ViewChild(JigsawTreeExt)
    public treeExt: JigsawTreeExt;

    public data: SimpleTreeData;

    constructor(http: HttpClient) {
        this.data = new SimpleTreeData();
        this.data.http = http;
        this.data.fromAjax("mock-data/tree-data");
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
