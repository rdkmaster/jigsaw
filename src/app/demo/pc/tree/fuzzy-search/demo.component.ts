import {Component, ViewChild} from "@angular/core";
import {JigsawTreeExt, SimpleTreeData, ArrayCollection} from "jigsaw/public_api";
import {HttpClient} from '@angular/common/http';
import {TreeTextService} from "../doc.service";

@Component({
    selector: 'fuzzy-search-tree',
    templateUrl: './demo.component.html'
})
export class ZtreeFuzzySearchComponent {
    public selectedLabel = {label: "中", size: "medium"};
    public labelData: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "large"}
    ]);

    @ViewChild(JigsawTreeExt)

    public treeExt: JigsawTreeExt;

    public data: SimpleTreeData;

    constructor(http: HttpClient, public text: TreeTextService) {
        this.data = new SimpleTreeData();
        this.data.http = http;
        this.data.fromAjax("mock-data/tree-data");
    }
}
