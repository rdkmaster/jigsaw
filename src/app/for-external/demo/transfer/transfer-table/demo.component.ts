import {Component, ElementRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { TableData, TransferTableSourceRenderer, TransferListDestRenderer, ArrayCollection, ListOption } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'transfer-transfer-table',
    templateUrl: './demo.component.html'
})
export class TransferTableDemoComponent extends AsyncDescription {
    public demoPath = "demo/transfer/transfer-table";

    public data: TableData;
    public selectedItems: ArrayCollection<ListOption>;
    public sourceRenderer = TransferTableSourceRenderer;
    public targetRenderer = TransferListDestRenderer;

    public labelField = 'name';
    public trackItemBy = 'id';

    public selectedItemsChange($event) {
        console.log($event)
    }

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.data = new TableData(
            [
                [
                    "Tiger Nixon1",
                    "System Architect",
                    1
                ],
                [
                    "Garrett Winters1",
                    "Accountant",
                    2
                ],
                [
                    "Tiger Nixon2",
                    "System Architect",
                    3
                ],
                [
                    "Garrett Winters2",
                    "Accountant",
                    4
                ],
                [
                    "Tiger Nixon3",
                    "System Architect",
                    5
                ],
                [
                    "Garrett Winters3",
                    "Accountant",
                    6
                ],
                [
                    "Tiger Nixon4",
                    "System Architect",
                    7
                ],
                [
                    "Garrett Winters4",
                    "Accountant",
                    8
                ],
                [
                    "Tiger Nixon5",
                    "System Architect",
                    9
                ],
                [
                    "Garrett Winters5",
                    "Accountant",
                    10
                ],
                [
                    "Tiger Nixon6",
                    "System Architect",
                    11
                ],
                [
                    "Tiger Nixon9",
                    "System Architect",
                    12
                ],
                [
                    "Tiger Nixon7",
                    "System Architect",
                    13
                ],
                [
                    "Tiger Nixon8",
                    "System Architect",
                    14
                ],
                [
                    "Garrett Winters12",
                    "Accountant",
                    15
                ],
                [
                    "Tiger Nixon24",
                    "System Architect",
                    16
                ],
                [
                    "Tiger Nixon13",
                    "System Architect",
                    17
                ],
                [
                    "Garrett Winters12",
                    "Accountant",
                    18
                ],
                [
                    "Tigers Nixon21",
                    "System Architect",
                    19
                ]
            ],
            ["name", "position", "id"],
            ["姓名", "职位", "ID"]);

        this.selectedItems = new ArrayCollection([{ name: 'Tiger Nixon2', id: 3 }, { name: "Garrett Winters2", id: 4 }]);
    }
}
