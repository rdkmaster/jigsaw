import {Component, AfterViewInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {TableData} from "../../../../../core/data/table-data";
import {ColumnDefine, TableCellRenderer} from "../../../../../component/table/table-api";
import {RdkInput} from "../../../../../component/input/input";


/*
 * 自定义单元格渲染组件
 * */
@Component({
    template: '<span>{{cellData}}</span>'
})
export class MyTableCell extends TableCellRenderer {
}

/*
 * 编辑单元格渲染器
 * */
@Component({
    template: `<rdk-input #input [(value)]="cellData" width="100%" [clearable]="false" (blur)="dispatchRenderChange(cellData)"></rdk-input>`
})
export class MyTableCellEditor extends TableCellRenderer implements AfterViewInit{

    @ViewChild(RdkInput) input: RdkInput;

    ngAfterViewInit(){
        this.input.focus();
    }

}



@Component({
  templateUrl: 'setCellEditable.html',
    encapsulation: ViewEncapsulation.None
})
export class TableSetCellEditableDemoComponent {
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
                "System Architect",
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



    private _columns: ColumnDefine[] = [
        {
            target: 'position',
            group : true,
            cell :{
                renderer: MyTableCell,
                editable : true,
                editorRenderer : MyTableCellEditor
            }

        }];

    private _changeMsg : string;

    public onCellChange(value) {
        this._changeMsg = `field: '${value.field}', row: ${value.row}, column: ${value.column}, rawColumn: ${value.rawColumn}, cellData: ${value.cellData}, oldCellData: ${value.oldCellData}`;
    }
}



