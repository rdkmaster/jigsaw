import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    LocalPageableTableData, PageableTableData, AdditionalColumnDefine, AdditionalTableData,
    TableCellCheckboxRenderer, TableHeadCheckboxRenderer
} from "jigsaw/public_api";
import {TableRendererTextService} from "../doc.service";

@Component({
    selector: 'checkbox-column-pageable-table',
    templateUrl: './demo.component.html',
    styles: [`
        .live-demo-wrap j-tag {
            margin: 6px;
        }
    `]
})
export class TableAddCheckboxColumnPageableDemoComponent {
    pageable: LocalPageableTableData | PageableTableData;

    constructor(http: HttpClient, public doc: TableRendererTextService) {
        this.pageable = new PageableTableData(http, {
            url: 'mock-data/hr-list', body: {aa: 11, bb: 22}, method: 'post'
        });
        this.pageable.pagingInfo.pageSize = 10;
        //切换成本地分页
        /*this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.pagingInfo.pageSize = 10;
        this.pageable.fromAjax('mock-data/hr-list');*/
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
        width: 30,
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

    onSearch(reg) {
        console.log(reg);
        const filter = function(item) {
            return item[0].match(new RegExp(this.reg, 'g'));
        };
        const context = {reg};
        this.pageable.filter(filter, context);
    }
}
