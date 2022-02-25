import {Component} from "@angular/core";
import {ArrayCollection, TransferListSourceRenderer, TransferListTargetRenderer} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TransferArrayDemoComponent {
    public sourceRenderer = TransferListSourceRenderer;
    public targetRenderer = TransferListTargetRenderer;

    constructor() {
        this.normalData = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安"]);
        this.normalSelectedData = new ArrayCollection(["上海", "南京"]);
    }

    normalData: ArrayCollection<any>;
    normalSelectedData: ArrayCollection<any>;

    addItem(data: ArrayCollection<any>) {
        data.push(`${Date.now()}`);
        data.refresh();
    }

    removeItem() {
        this.normalData.pop();
        this.normalData.refresh();
    }

    resetInputData() {
        this.normalData = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安"]);
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
