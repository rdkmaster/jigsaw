import { Component } from "@angular/core";
import { TableData } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TransferTableDemoComponent {

    constructor() {
        this.data = new TableData(
            [
                [
                    "Tiger Nixon1",
                    "System Architect"
                ],
                [
                    "Garrett Winflters1",
                    "Accountant"
                ],
                [
                    "Tiger Nixon2",
                    "System Arcfhitect"
                ],
                [
                    "Garrett Winslters2",
                    "Accountant"
                ],
                [
                    "Tiger Nixon3",
                    "System Arcfhitect"
                ],
                [
                    "Garrett Winflters3",
                    "Accountant"
                ],
                [
                    "Tiger Nixon4",
                    "System Arcfhitect"
                ],
                [
                    "Garrett Winflters4",
                    "Accountant"
                ],
                [
                    "Tiger Nixon5",
                    "System Arcfhitect"
                ],
                [
                    "Garrett Wintsers5",
                    "Accountant"
                ],
                [
                    "Tigser Nixon6",
                    "System Architect"
                ],
                [
                    "Tiger Nixon9",
                    "System Architect"
                ],
                [
                    "Tiger Nixon7",
                    "System Architect"
                ],
                [
                    "Tiger Nixon8",
                    "System Architect"
                ],
                [
                    "Garrett Winters12",
                    "Accountant"
                ],
                [
                    "Tiger Nixon24",
                    "System Architect"
                ],
                [
                    "Tigesr Nixon13",
                    "System Architect"
                ],
                [
                    "Garretst Winters12",
                    "Accountant"
                ],
                [
                    "Tigers Nixon21",
                    "System Architect"
                ]
            ],
            ["name", "position"],
            ["姓名", "职位"]);
    }

    data: TableData;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
