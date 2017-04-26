import {Component} from "@angular/core";
import {TableData} from "../../../../../core/data/table-data";
import {ColumnDefine} from "../../../../../component/table/table-api";
import {TableCellDefault} from "../../../../../component/table/table-renderer";

@Component({
  templateUrl: 'dataChange.html'
})
export class TableDataChangeDemoComponent {
    tableData: TableData;
    constructor() {
        this.tableData = new TableData(
            [
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
                [
                    "Tiger Nixon2",
                    "System Arcfhitect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Garrett Winslters1",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    "Tiger Nixon2",
                    "System Arcfhitect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Garrett Winflters1",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    "Tiger Nixon2",
                    "System Arcfhitect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Garrett Winflters1",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    "Tiger Nixon2",
                    "System Arcfhitect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Garrett Wintsers2",
                    "Accountant",
                    "$170,50",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    "Tigser Nixon3",
                    "System Architect",
                    "$320,800",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Tiger Nixon3",
                    "System Architect",
                    "$3,800",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Tiger Nixon3",
                    "System Architect",
                    "$320,800",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Tiger Nixon1",
                    "System Architect",
                    "$320,80",
                    "2011/04/25",
                    "Edinburgh",
                    "542111"
                ],
                [
                    "Garrett Winters1",
                    "Accountant",
                    "$170,750",
                    "2011/07/25",
                    "Tokyo",
                    "84212"
                ],
                [
                    "Tiger Nixon2",
                    "System Architect",
                    "$320,800",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Tigesr Nixon1",
                    "System Architect",
                    "$320,800",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
                [
                    "Garretst Winters1",
                    "Accountant",
                    "$170,750",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    "Tigers Nixon2",
                    "System Architect",
                    "$320,800",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ]
            ],
            ["name", "position", "salary", "start_date", "office", "extn"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]);
    }

    columns: ColumnDefine[] = [
        {
            target: 'name',
            width: '15%',
            cell: {
                renderer: TableCellDefault,
            }
        },
    ];

    dataChange(){
        this.tableData = new TableData(this.tableData.data.slice(0,3),this.tableData.field,this.tableData.header);
        console.log(this.tableData.data)
    }

    columnsChange(){
        this.columns = [
            {
                target: 'position',
                width: '20%',
                cell: {
                    renderer: TableCellDefault,
                }
            },
        ];

        //暂不支持修改数组
        /*this.columnDefines.push({
            target: 'position',
            width: '20%',
            cell: {
                renderer: TableCellDefault,
            }
        },)*/
    }
}

