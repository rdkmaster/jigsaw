import { Component } from "@angular/core";
import { SimpleTreeData, TransferListDestRenderer, TransferTreeSourceRenderer, ArrayCollection, ListOption } from "jigsaw/public_api";
import { HttpClient } from '@angular/common/http';
import { TransferTextService } from "../doc.service";

@Component({
    selector: 'transfer-tree-transfer',
    templateUrl: './demo.component.html'
})
export class TransferTreeDemoComponent {
    public data: SimpleTreeData;
    public selectedData: ArrayCollection<ListOption>;

    public labelField = 'label';
    public trackItemBy = 'label';

    public sourceRenderer = TransferTreeSourceRenderer;
    public targetRenderer = TransferListDestRenderer;

    public selectedItemsChange($event) {
        console.log($event)
    }

    constructor(public http: HttpClient, public doc: TransferTextService) {
        this.data = new SimpleTreeData();
        this.data.http = http;
        this.data.fromAjax("mock-data/tree-data");

        this.selectedData = new ArrayCollection([
            { label: "叶子节点112", id: 2 },
            { label: "叶子节点114", id: 4 }
        ]);
    }
}
