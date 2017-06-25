import {AfterContentInit, Component, ViewChild} from "@angular/core";
import {TableData} from "../../../../rdk/core/data/table-data";
import {AdditionalColumnDefine} from "../../../../rdk/component/table/table-api";
import {TableHeadCheckbox, TableCellCheckbox} from "../../../../rdk/component/table/table-renderer";
import {Http} from "@angular/http";
import {RdkTable} from "../../../../rdk/component/table/table";


@Component({
  templateUrl: 'addCheckboxColumn.html'
})
export class TableAddCheckboxColumnDemoComponent{
    tableData: TableData;

    private _changeMsg: string;

    private _selectedRows: string;

    @ViewChild('myTable') myTable: RdkTable;

    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.onAjaxComplete(() => {
            console.log(this.tableData);
            let checkedRow = [0, 1, 3, 6, 8];
            setTimeout(() => {
                this.myTable.getRenderers(0).forEach(renderer => {
                    if(checkedRow.indexOf(renderer.row) != -1){
                        renderer.renderer.setCheckboxState(true);
                    }
                })
            }, 0)
        });
        this.tableData.fromAjax('mock-data/table/data.json');
    }

    private _additionalColumns: AdditionalColumnDefine[] = [{
        pos: 0,
        header: {
            renderer: TableHeadCheckbox,
        },
        cell: {
            renderer: TableCellCheckbox
        }
    }];

    public onCellChange(value) {
        this._changeMsg = `field: '${value.field}', row: ${value.row}, column: ${value.column}, rawColumn: ${value.rawColumn}, cellData: ${value.cellData}, oldCellData: ${value.oldCellData}`;
        let rows = value.row instanceof Array ? value.row : [value.row];
        for(let row of rows){
            console.log(this.tableData.data[row][value.rawColumn]);
        }

        this._selectedRows = "";
        this.myTable.getRenderers(0).forEach(renderer => {
            const checkboxState = renderer.renderer.checkboxState;
            if(checkboxState.checked == true){
                this._selectedRows = this._selectedRows + checkboxState.row + " , " ;
            }
        });

    }

}



