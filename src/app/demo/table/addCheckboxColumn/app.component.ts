import {
    Component, ViewChild, Renderer2, ViewContainerRef
} from "@angular/core";
import {Http} from "@angular/http";
import {TableData} from "jigsaw/core/data/table-data";
import {AdditionalColumnDefine} from "jigsaw/component/table/table-api";
import {TableHeadCheckbox, TableCellCheckbox} from "jigsaw/component/table/table-renderer";
import {JigsawTable} from "jigsaw/component/table/table";


@Component({
    templateUrl: './app.component.html'
})
export class TableAddCheckboxColumnDemoComponent {
    tableData: TableData;

    _changeMsg: string;

    _selectedRows: string;

    @ViewChild('myTable') myTable: JigsawTable;

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.onAjaxComplete(() => {
            console.log(this.tableData);
            let checkedRow = [0, 1, 3, 6, 8];
            setTimeout(() => {
                this.myTable.getRenderers(0).forEach(rendererInfo => {
                    if (checkedRow.indexOf(rendererInfo.row) != -1) {
                        const renderer = <TableCellCheckbox>rendererInfo.renderer;
                        renderer.setCheckboxState(true);
                    }
                })
            }, 0)
        });
        this.tableData.fromAjax('mock-data/table/data.json');
    }

    _additionalColumns: AdditionalColumnDefine[] = [{
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
        for (let row of rows) {
            console.log(this.tableData.data[row][value.rawColumn]);
        }

        this._selectedRows = "";
        this.myTable.getRenderers(0).forEach(rendererInfo => {
            const renderer = <TableCellCheckbox>rendererInfo.renderer;
            const checkboxState = renderer.checkboxState;
            if (checkboxState.checked == true) {
                this._selectedRows = this._selectedRows + checkboxState.row + " , ";
            }
        });
    }
}



