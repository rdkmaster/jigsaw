import {Component, AfterViewInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {TableData} from "../../../../rdk/core/data/table-data";
import {ColumnDefine, TableCellRenderer} from "../../../../rdk/component/table/table-api";
import {RdkInput} from "../../../../rdk/component/input/input";
import {Http} from "@angular/http";


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
    template: `<rdk-input #input [(value)]="cellData" [clearable]="false" (blur)="dispatchChangeEvent(cellData)"></rdk-input>`
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

    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }

    private _columns: ColumnDefine[] = [
        {
            target: 'position',
            width: '20%',
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
        let rows = value.row instanceof Array ? value.row : [value.row];
        for(let row of rows){
            console.log(this.tableData.data[row][value.rawColumn]);
        }
    }
}



