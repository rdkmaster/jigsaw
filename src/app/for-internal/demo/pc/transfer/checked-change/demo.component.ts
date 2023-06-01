import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ArrayCollection, ListOption, TransferListDestRenderer, TransferListSourceRenderer} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css']
})
export class TransferCheckedChangeDemoComponent {
    constructor(private _http: HttpClient) {
        this.data = [{ zhName: "北京" }, { zhName: "上海" }, { zhName: "南京" }, { zhName: "深圳" }, { zhName: "长沙" }, { zhName: "西安" }];
    }

    public data: ListOption[];
    public selectedItems: ArrayCollection<ListOption>

    public sourceRenderer = TransferListSourceRenderer;
    public targetRenderer = TransferListDestRenderer;

    public labelField = 'zhName';
    public subLabelField = 'enName';
    public trackItemBy = 'zhName';
    public sourceCheckedItems: string;
    public destCheckedItems: string;

    public checked = true;

    public sourceChecked($event: ArrayCollection<ListOption>): void {
        if (this.checked && $event.length > 3) {
            $event.splice(3, $event.length - 3);
        }
        console.log("source checked change: ", $event);
        const items = $event.map(item => item.zhName);
        this.sourceCheckedItems = items.join(", ");
    }

    public destinationChecked($event: ArrayCollection<ListOption>): void {
        console.log("dest checked change: ", $event);
        const items = $event.map(item => item.zhName);
        this.destCheckedItems = items.join(", ");
    }

    public selectedItemsChange(): void {
        this.sourceCheckedItems = "";
        this.destCheckedItems = "";
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
