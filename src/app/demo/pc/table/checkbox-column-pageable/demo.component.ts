import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocalPageableTableData, PageableTableData} from "jigsaw/common/core/data/table-data";
import {AdditionalColumnDefine, AdditionalTableData} from "jigsaw/pc-components/table/table-typings";
import {TableCellCheckboxRenderer, TableHeadCheckboxRenderer} from "jigsaw/pc-components/table/table-renderer";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        j-tag {
            margin: 6px;
        }
    `]
})
export class TableAddCheckboxColumnPageableDemoComponent {
    pageable: LocalPageableTableData | PageableTableData;

    constructor(http: HttpClient) {
        this.pageable = new LocalPageableTableData();
        /*//切换成服务端分页
        this.pageable = new PageableTableData(http, {
            url: 'mock-data/hr-list', body: {aa: 11, bb: 22}, method: 'post'
        });*/
        this.pageable.http = http;
        this.pageable.pagingInfo.pageSize = 10;
        this.pageable.fromAjax('mock-data/hr-list');
        this.pageable.onAjaxComplete(() => {
            setTimeout(() => {
                if(this.additionalData) console.log(this.additionalData.data);
            }, 1000)
        })
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

    changeData() {
        this.pageable.fromAjax('mock-data/hr-list-short');
        // 重置additionalData
        this.additionalData.reset();

        this.allSelectedRows = [];
        this.selectedRows = '';
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

