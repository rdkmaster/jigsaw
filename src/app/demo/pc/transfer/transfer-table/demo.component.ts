import { Component } from "@angular/core";
import { TableData, TransferTableSourceRenderer, TransferListTargetRenderer, ArrayCollection, listOption, TransferTableTargetRenderer } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TransferTableDemoComponent {
    constructor() {
        this.data = new TableData(
            [
                [
                    "Tiger Nixon1",
                    "System Architect",
                    1
                ],
                [
                    "Garrett Winflters1",
                    "Accountant",
                    2
                ],
                [
                    "Tiger Nixon2",
                    "System Arcfhitect",
                    3
                ],
                [
                    "Garrett Winslters2",
                    "Accountant",
                    4
                ],
                [
                    "Tiger Nixon3",
                    "System Arcfhitect",
                    5
                ],
                [
                    "Garrett Winflters3",
                    "Accountant",
                    6
                ],
                [
                    "Tiger Nixon4",
                    "System Arcfhitect",
                    7
                ],
                [
                    "Garrett Winflters4",
                    "Accountant",
                    8
                ],
                [
                    "Tiger Nixon5",
                    "System Arcfhitect",
                    9
                ],
                [
                    "Garrett Wintsers5",
                    "Accountant",
                    10
                ],
                [
                    "Tigser Nixon6",
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
                    "Tigesr Nixon13",
                    "System Architect",
                    17
                ],
                [
                    "Garretst Winters12",
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

        this.selectedData = new ArrayCollection([{ name: 'Tiger Nixon2', id: 3 }, { name: "Garrett Winslters2", id: 4 }]);
    }

    data: TableData;
    public sourceRenderer = TransferTableSourceRenderer;
    public targetRenderer = TransferListTargetRenderer;

    selectedData: ArrayCollection<listOption>;

    labelField = 'name';
    trackItemBy = 'id';

    addItem() {
        const id = Date.now();
        this.data.data.push(["姓名", "职位", id])
        this.data.refresh();
    }

    removeItem() {
        this.data.data.pop();
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
                    "Garrett Winflters1",
                    "Accountant",
                    2
                ],
                [
                    "Tiger Nixon2",
                    "System Arcfhitect",
                    3
                ],
                [
                    "Garrett Winslters2",
                    "Accountant",
                    4
                ],
                [
                    "Tiger Nixon3",
                    "System Arcfhitect",
                    5
                ],
                [
                    "Garrett Winflters3",
                    "Accountant",
                    6
                ],
                [
                    "Tiger Nixon4",
                    "System Arcfhitect",
                    7
                ],
                [
                    "Garrett Winflters4",
                    "Accountant",
                    8
                ],
                [
                    "Tiger Nixon5",
                    "System Arcfhitect",
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
                    "Garrett Winflters1",
                    "Accountant",
                    2
                ],
                [
                    "Tiger Nixon2",
                    "System Arcfhitect",
                    3
                ],
                [
                    "Garrett Winslters2",
                    "Accountant",
                    4
                ],
                [
                    "Tiger Nixon3",
                    "System Arcfhitect",
                    5
                ],
                [
                    "Garrett Winflters3",
                    "Accountant",
                    6
                ],
                [
                    "Tiger Nixon4",
                    "System Arcfhitect",
                    7
                ],
                [
                    "Garrett Winflters4",
                    "Accountant",
                    8
                ],
                [
                    "Tiger Nixon5",
                    "System Arcfhitect",
                    9
                ],
                [
                    "Garrett Wintsers5",
                    "Accountant",
                    10
                ],
                [
                    "Tigser Nixon6",
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
                    "Tigesr Nixon13",
                    "System Architect",
                    17
                ],
                [
                    "Garretst Winters12",
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
        this.selectedData = new ArrayCollection([{ name: 'Tiger Nixon2', id: 3 }, { name: "Garrett Winslters2", id: 4 }]);
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
