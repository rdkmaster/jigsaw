import { Component } from "@angular/core";
import { TableData, TransferTableSourceRenderer, TransferListDestRenderer, ArrayCollection, ListOption } from "jigsaw/public_api";
import {TransferTextService} from "../text.service";

@Component({
    selector: 'transfer-table-transfer',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TransferTableDemoComponent {
    constructor(public text: TransferTextService) {
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

    data: TableData;
    public sourceRenderer = TransferTableSourceRenderer;
    public targetRenderer = TransferListDestRenderer;

    selectedItems: ArrayCollection<ListOption>;

    labelField = 'name';
    trackItemBy = 'id';

    addItem() {
        const id = Date.now();
        this.data.data.push(["姓名", "职位", id])
        this.data.refresh();
    }

    removeItem() {
        this.data.data.pop();
        this.selectedItems.length = 0;
        this.data.refresh();
    }

    changeDataFromObject() {
        this.data.fromObject({
            data: [
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
                ]
            ],
            field: ["name", "position", "id"],
            header: ["姓名", "职位", "ID"]
        })
    }

    resetInputData() {
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
                    "Garrets Winters12",
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
    }

    selectedItemsChange($event) {
        console.log($event)
    }

    resetSelectedData() {
        this.selectedItems = new ArrayCollection([{ name: 'Tiger Nixon2', id: 3 }, { name: "Garrett Winters2", id: 4 }]);
    }
}
