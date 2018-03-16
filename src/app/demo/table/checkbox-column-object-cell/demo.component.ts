import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {AdditionalColumnDefine, AdditionalTableData, ColumnDefine} from "jigsaw/component/table/table-typings";
import {TableCellCheckboxRenderer, TableCellRendererBase, TableHeadCheckboxRenderer} from "jigsaw/component/table/table-renderer";

@Component({
    templateUrl: './demo.component.html'
})
export class TableCheckboxColumnObjectCellDemoComponent {
    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        // 对ajax返回过来的数据进行预处理
        this.tableData.dataReviser = this.addToString;
        this.tableData.fromAjax('mock-data/hr-list-complex');
    }

    tableData: TableData;
    selectedRows: string;
    additionalData: AdditionalTableData;

    columnDefineGenerator(field, index): ColumnDefine {
        return {
            cell: {
                renderer: TableCellObjectRenderer
            }
        }
    }

    additionalColumns: AdditionalColumnDefine[] = [{
        pos: 0,
        header: {
            renderer: TableHeadCheckboxRenderer,
        },
        cell: {
            renderer: TableCellCheckboxRenderer
        }
    }];

    additionalDataChange(value) {
        console.log(value);
        this.selectedRows = this.getSelectedRows(this.additionalData);
    }

    /**
     * 在Json Object对象中添加valueOf方法
     * @param data
     * @returns {any}
     */
    addToString(data) {
        if (!data || !TableData.isTableData(data)) {
            return data;
        }
        // 这边把`'name'`字段作为一行的标识，所以只需要实现`'name'`字段单元格的`valueOf`
        const index = data.field.findIndex(item => item == 'name');
        // 以每个单元格的value属性作为这个单元格的值，这样做的原因，请参考此demo的描述信息。
        data.data.forEach(row => row[index].valueOf = () => row[index].value);
        return data;
    }

    /**
     * 获取选中的行
     * @param additionalData
     */
    getSelectedRows(additionalData) {
        return additionalData.data.reduce((selectedRows, item, index) => {
            if (item[0]) {
                selectedRows.push(index);
            }
            return selectedRows;
        }, []).join(',');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这demo介绍table中使用内置checkbox渲染器';
    description: string = require('!!raw-loader!../checkbox-column/readme.md');
    tags: string[] = [
        'JigsawTable.additionalColumnDefines',
        'JigsawTable.additionalDataChange',
        'AdditionalColumnDefine',
        'AdditionalTableData',
        'TableHeadCheckboxRenderer',
        'TableCellCheckboxRenderer',
    ];
}

@Component({
    template: `{{cellData.value}}`
})
export class TableCellObjectRenderer extends TableCellRendererBase implements OnInit {

}

