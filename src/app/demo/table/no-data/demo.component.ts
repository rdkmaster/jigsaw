import {Component} from "@angular/core";
import {TableData} from "jigsaw/core/data/table-data";

@Component({
    templateUrl: './demo.component.html'
})
export class TableNoDataDemoComponent {
    tableData: TableData;

    constructor() {
        this.tableData = new TableData(
            /*[
                [
                    "Tiger Nixon1",
                    "System Architect",
                    "$320,00",
                    "2011/04/25",
                    "Edinburgh",
                    "542"
                ],
                [
                    "Garrett Winflters1",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
            ],*/
            [],
            ["name", "position", "salary", "enroll-date", "office", "extn"],
            ["姓名", "职位职位职位职位职位职位职位职位职位职位", "薪资薪资薪资薪资薪资薪资薪资薪资薪资", "入职日期入职日期入职日期入职日期入职日期入职日期入职日期入职日期入职日期", "部门", "其他"]);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawTable',
        'TableData'
    ];
}

