import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ArrayCollection, ListOption, TransferListDestRenderer, TransferListSourceRenderer} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TransferCheckedChangeDemoComponent {
    constructor(private _http: HttpClient) {
        this.data = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安"]);
    }

    data: ArrayCollection<any>;

    public sourceRenderer = TransferListSourceRenderer;
    public targetRenderer = TransferListDestRenderer;

    public labelField = 'zhName';
    public subLabelField = 'enName';
    public trackItemBy = 'shortName';
    public sourceCheckedItems: string;
    public destCheckedItems: string;

    public sourceCheckedChange($event: ArrayCollection<ListOption>): void {
        console.log("source checked change: ", $event);
        this.sourceCheckedItems = $event.join(", ");
    }

    public destCheckedChange($event: ArrayCollection<ListOption>): void {
        console.log("dest checked change: ", $event);
        this.destCheckedItems = $event.join(", ");
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
