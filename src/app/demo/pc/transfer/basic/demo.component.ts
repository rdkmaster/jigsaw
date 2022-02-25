import { Component } from "@angular/core";
import { ArrayCollection, TransferListSourceRenderer, TransferListTargetRenderer } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TransferArrayDemoComponent {
    public sourceRenderer = TransferListSourceRenderer;
    public targetRenderer = TransferListTargetRenderer;

    normalData: ArrayCollection<any>;
    normalSelectedData: ArrayCollection<any>;

    constructor() {
        this.normalData = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安"]);
        this.normalSelectedData = new ArrayCollection(["上海", "南京"]);
    }

    addItem(data: ArrayCollection<any>) {
        data.push(`${Date.now()}`);
        data.refresh();
    }

    removeItem(data: ArrayCollection<any>) {
        data.pop();
        data.refresh();
    }

    resetInputData() {
        this.normalData = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安"]);
    }

    changeInputData() {
        this.normalSelectedData = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安", "杭州", "广州", "香港", "澳门"]);
    }

    changeSelectedData() {
        this.normalSelectedData = new ArrayCollection(["深圳", "长沙"]);
    }

    resetSelectedData() {
        this.normalSelectedData = new ArrayCollection(["上海", "南京"]);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
