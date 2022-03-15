import { Component } from "@angular/core";
import { TransferListSourceRenderer, TransferListDestRenderer } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TransferListArrayDemoComponent {
    public sourceRenderer = TransferListSourceRenderer;
    public targetRenderer = TransferListDestRenderer;

    data: any[];
    selectedItems: any[];
    array = ["北京", "上海", "南京", "深圳", "长沙", "西安"];

    constructor() {
        this.data = this.array;
        this.selectedItems = ["上海", "南京"];
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
