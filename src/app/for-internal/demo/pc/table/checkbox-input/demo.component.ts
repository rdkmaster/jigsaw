import {Component, ViewEncapsulation} from "@angular/core";
import {
    AdditionalColumnDefine,
    AdditionalTableData,
    ColumnDefine,
    TableCellCheckboxRenderer,
    TableCellTextEditorRenderer,
    TableData,
    TableHeadCheckboxRenderer,
    TableValueGenerators
} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class TableCheckBoxInputDemoComponent {
    constructor() {
        this.tableData = new TableData(
            [
                ["", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "541"],
                ["Garrett Winters", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "542"],
                ["Garrett Winters", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "543"],
                ["Garrett Winters", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "544"],
                ["Garrett Winters", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "545"],
                ["Garrett Winters", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "546"],
                ["Garrett Winters", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "547"],
                ["Garrett Winters", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "548"],
            ],
            ["name", "position", "salary", "enroll-date", "office", "extension"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]);
    }

    tableData: TableData;
    additionalData: AdditionalTableData;
    checkFields: string[];

    additionalColumns: AdditionalColumnDefine[] = [{
        pos: 0,
        width: 30,
        header: {
            renderer: TableHeadCheckboxRenderer,
        },
        cell: {
            renderer: TableCellCheckboxRenderer,
            data: (td, row) => this.checkFields?.includes(td.data[row][5]),
        }
    }];

    columnDefines: ColumnDefine[] = [
        {
            target: 'name',
            cell: {
                tooltip: TableValueGenerators.originCellDataGenerator,
                editorRenderer: TableCellTextEditorRenderer,
                editorRendererInitData: {
                    valid: (td, row, col, inputVal) => {
                        return !this.checkFields?.includes(td.data[row][5]) || !!inputVal;
                    },
                    clearable: false,
                },
                editable: true,
                alwaysShowEditor: true,
            },
        }
    ];

    additionalDataChange() {
        this.onCellChange()
    }

    public onCellChange() {
        this.checkFields = this.additionalData.data.reduce((selectedRows, item, index) => {
            if (item[0]) {
                selectedRows.push(this.tableData.data[index][5]);
            }
            return selectedRows;
        }, []);
        console.log(this.checkFields)
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = 'table中使用additional列的内置checkbox渲染器来控制Input框渲染器的valid值（当该行的checkbox被选中，该行的input框必须要有值）';
    description: string = "";
}
