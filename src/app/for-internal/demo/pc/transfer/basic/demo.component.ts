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
    data2: ArrayCollection<any>;
    data3: ArrayCollection<any>;
    selectedItems: ArrayCollection<any>;

    constructor() {
        this.data = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安"]);
        this.data1 = new ArrayCollection(["北京", "上海", "", "深圳", "长沙", "西安"]);
        this.data2 = new ArrayCollection([{ label: "北京", subLabel: '子标题' }, { label: "上海" }, { label: "南京" },
        { label: "深圳" }, { label: "长沙" }, { label: "西安", subLabel: '子标题' }]);
        this.data3 = new ArrayCollection([{ custom: "北京", someOtherField: '子标题' }, { custom: "上海" }, { custom: "南京" },
        { custom: "深圳" }, { custom: "长沙" }, { custom: "西安", someOtherField: '子标题' }]);
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
        this.selectedItems.refresh();
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
