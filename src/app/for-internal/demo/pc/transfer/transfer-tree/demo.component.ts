import { Component } from "@angular/core";
import { SimpleTreeData, TransferListDestRenderer, TransferTreeSourceRenderer, ArrayCollection, ListOption } from "jigsaw/public_api";
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TransferTreeDemoComponent {

    public sourceRenderer = TransferTreeSourceRenderer;
    public targetRenderer = TransferListDestRenderer;

    isAjax = false;

    constructor(public http: HttpClient) {
        this.resetData();

        this.selectedData = new ArrayCollection([
            { label: "叶子节点112", id: 2 },
            { label: "叶子节点114", id: 4 }
        ]);
    }

    data: SimpleTreeData;
    selectedData: ArrayCollection<ListOption>;

    labelField = 'label';
    trackItemBy = 'label';

    changeData(){
        this.data.fromObject(
            [
                {
                    label: "父节点1",
                    open: true,
                    nodes: [
                        {
                            label: "父节点11",
                            open: true,
                            nodes: [
                                { label: "修改节点111", id: 1 },
                                { label: "修改节点112", id: 2 },
                                { label: "修改节点113", id: 3 },
                                { label: "修改节点114", id: 4 }
                            ]
                        },
                        {
                            label: "父节点12",
                            nodes: [
                                { label: "修改节点121", id: 5 },
                                { label: "修改节点122", id: 6 },
                                { label: "修改节点123", id: 7 },
                                { label: "修改节点124", id: 8 }
                            ]
                        }
                    ]
                },
            ]
        );

    }

    resetData(){
        if (this.isAjax){
            this.data = new SimpleTreeData();
            this.data.http = this.http;
            this.data.fromAjax("mock-data/tree-data");
            return;
        }

        this.data = new SimpleTreeData();
        this.data.fromObject(
            [
                {
                    label: "父节点1",
                    open: true,
                    nodes: [
                        {
                            label: "父节点11",
                            open: true,
                            nodes: [
                                { label: "叶子节点111", id: 1, chkDisabled: true, checked: true },
                                { label: "叶子节点112", id: 2 },
                                { label: "叶子节点113", id: 3 },
                                { label: "叶子节点114", id: 4 }
                            ]
                        },
                        {
                            label: "父节点12",
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
                    label: "父节点2",
                    nodes: [
                        {
                            label: "父节点21",
                            open: true,
                            nodes: [
                                { label: "叶子节点211", id: 9 },
                                { label: "叶子节点212", id: 10 },
                                { label: "叶子节点213", id: 11 },
                                { label: "叶子节点214", id: 12 }
                            ]
                        },
                        {
                            label: "父节点22",
                            nodes: [
                                { label: "叶子节点221", id: 13 },
                                { label: "叶子节点222", id: 14 },
                                { label: "叶子节点223", id: 15 },
                                { label: "叶子节点224", id: 16 }
                            ]
                        },
                        {
                            label: "父节点23",
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
                    label: "父节点3",
                    nodes: []
                }
            ]
        );
    }

    selectedItemsChange($event) {
        console.log($event)
    }

    resetSelectedData() {
        this.selectedData = new ArrayCollection([
            { label: "叶子节点112", id: 2 },
            { label: "叶子节点114", id: 4 }
        ]);
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
