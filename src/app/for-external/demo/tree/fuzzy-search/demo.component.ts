import {Component, ElementRef, ViewChild} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {JigsawTreeExt, SimpleTreeData} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'tree-fuzzy-search',
    templateUrl: './demo.component.html'
})
export class ZtreeFuzzySearchComponent extends AsyncDescription {
    public demoPath = "demo/tree/fuzzy-search";
    public selectedSize = {size: "medium"};

    @ViewChild(JigsawTreeExt)
    public treeExt: JigsawTreeExt;

    public data: SimpleTreeData;

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.data = new SimpleTreeData();
        this.data.http = http;
        this.data.fromAjax("mock-data/tree-data");
    }
}
