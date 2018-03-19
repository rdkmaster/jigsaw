import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocalPageableTableData} from "jigsaw/core/data/table-data";
import {AdditionalColumnDefine, AdditionalTableData} from "jigsaw/component/table/table-typings";
import {TableCellCheckboxRenderer, TableHeadCheckboxRenderer} from "jigsaw/component/table/table-renderer";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        j-tag {
            margin: 6px;
        }
    `]
})
export class TableAddCheckboxColumnPageableDemoComponent {
    pageable: LocalPageableTableData;

    constructor(http: HttpClient) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.pagingInfo.pageSize = 10;
        this.pageable.fromAjax('mock-data/hr-list');
    }

    selectedRows: string;
    allSelectedRows: any;
    additionalData: AdditionalTableData;

    additionalColumns: AdditionalColumnDefine[] = [{
        pos: 0,
        header: {
            renderer: TableHeadCheckboxRenderer,
        },
        cell: {
            renderer: TableCellCheckboxRenderer,
            //data: (td, row, col) => td.data[row][2] == 'Developer', // 可以在这边设置默认值
        }
    }];

    additionalDataChange(value) {
        console.log(value);
        this.selectedRows = this.getSelectedRows(value);
        this.allSelectedRows = this.getAllSelectedRows(value);
        console.log(this.allSelectedRows);
    }

    /**
     * 获取当前选中的行
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

    /**
     * 获取所有选中的行
     * @param additionalData
     */
    getAllSelectedRows(additionalData) {
        return additionalData.getAllTouched(0).reduce((selectedRows, item) => {
            if (item.value) {
                selectedRows.push({name: item.data[0], key: item.key});
            }
            return selectedRows;
        }, []);
    }

    removeRow(row){
        console.log(row);
        this.additionalData.touchValue(0, row.key, false);
        this.additionalData.refresh();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这demo介绍table中使用内置checkbox渲染器';
    description: string = require('!!raw-loader!../checkbox-column/readme.md');
    tags: string[] = [
        'LocalPageableTableData',
        'JigsawTable.additionalColumnDefines',
        'JigsawTable.additionalDataChange',
        'AdditionalColumnDefine',
        'AdditionalTableData',
        'TableHeadCheckboxRenderer',
        'TableCellCheckboxRenderer',
        'TableHeader.renderer',
        'TableCell.renderer',
        'JigsawPagination',
        'JigsawTag',
    ];
}

