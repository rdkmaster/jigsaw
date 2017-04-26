import {Component} from "@angular/core";
import {TableData} from "../../../../../core/data/table-data";
import {AdditionalColumnDefine, TableCellRenderer} from "../../../../../component/table/table-api";

/*
 * 操作列头
 * */
@Component({
    template: '<span>操作</span>'
})
export class MyTableHeadOption extends TableCellRenderer {
}

/*
 * 操作列
 * */
@Component({
    template: '<a href="javascript:;">修改</a><a href="javascript:;">删除</a>{{tableData.data[row][0]}} ',
    styles: [`a{color: #ffaa00} a:hover{text-decoration: underline}`]
})
export class MyTableCellOption extends TableCellRenderer {
}


@Component({
    template: '<a href="javascript:;">修改</a><a href="javascript:;">删除</a>{{cellData}} ',
    styles: [`a{color: #ffaa00} a:hover{text-decoration: underline}`]
})
export class MyTableCellOption2 extends TableCellRenderer {
}




@Component({
  templateUrl: 'addColumn.html'
})
export class TableAddColumnDemoComponent {
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
                ],[
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
                ]
            ],
            ["name", "position", "salary", "start_date", "office", "extn"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]);

    }



    private _additionalColumns: AdditionalColumnDefine[] = [{
            pos : -1,
            header: {
                renderer: MyTableHeadOption,
            },
            cell: {
                renderer: MyTableCellOption
            }
        },{
            pos : -1,
            target : "salary",
            header: {
                renderer: MyTableHeadOption,
            },
            cell: {
                renderer: MyTableCellOption2
            }
    }]
}



