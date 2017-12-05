import {AfterViewInit, Component, TemplateRef, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "jigsaw/component/table/table-typings";

@Component({
    templateUrl: './app.component.html'
})
export class TableSetCellRenderDemoComponent implements AfterViewInit {

    @ViewChild("jobCellRender") jobCellRender: TemplateRef<any>;

    tableData: TableData;

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    columns: ColumnDefine[];

    ngAfterViewInit() {
        // 如果报变更检查错误，需要加个异步处理，这样会触发angular的变更检查
        // 通过ViewChild获取的TemplateRef,必须在AfterViewInit之后才能拿到
        setTimeout(() => {
            this.columns = [
                {
                    target: 'position',
                    cell: {
                        renderer: this.jobCellRender
                    }
                }
            ];
        })
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}



