import { Component } from "@angular/core";
import { ArrayCollection, TransferListSourceRenderer, TransferListDestRenderer } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TransferArrayDemoComponent {
    public sourceRenderer = TransferListSourceRenderer;
    public targetRenderer = TransferListDestRenderer;

    data: ArrayCollection<any>;
    data1: ArrayCollection<any>;
    selectedItems: ArrayCollection<any>;

    constructor() {
        this.data = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安"]);
        this.data1 = new ArrayCollection(["北京", "上海", "", "深圳", "长沙", "西安"]);
        this.selectedItems = new ArrayCollection(["上海", "南京"]);
    }

    addItem() {
        this.data.push(`${(Date.now().toString())}`);
        this.data.refresh();
    }

    removeItem() {
        const item = this.data.pop();
        const idx = this.selectedItems.indexOf(item);
        if (idx != -1) {
            this.selectedItems.splice(idx, 1);
        }
        this.data.refresh();
        this.selectedItems.refresh();
    }

    addSelectedItem() {
        const newLabel = Date.now().toString();
        this.data.push(newLabel);
        this.data.refresh();
        this.selectedItems.push(newLabel);
    }

    removeSelectedItem() {
        this.selectedItems.pop();
        this.selectedItems.refresh();
    }

    resetInputData() {
        this.data = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安"]);
    }

    changeInputData() {
        this.data = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安", "杭州", "广州", "香港", "澳门"]);
    }

    changeSelectedData() {
        this.selectedItems = new ArrayCollection(["深圳", "长沙"]);
    }

    resetSelectedData() {
        this.selectedItems = new ArrayCollection(["上海", "南京"]);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
