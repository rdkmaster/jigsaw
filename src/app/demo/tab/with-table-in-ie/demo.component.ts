import {Component, Input, OnInit} from '@angular/core';
import {LocalPageableTableData, PageableTableData, TableData} from "../../../../jigsaw/core/data/table-data";
import {HttpClient} from "@angular/common/http";

@Component({
    templateUrl: "./demo.component.html"
})
export class TabsWithTableInIEComponent implements OnInit {
    tabDatas: Array<string>;

    ngOnInit() {
        this.tabDatas = ["Tab1", "Tab2", "Tab3", "Tab4"]
    }

    testEvent() {
        console.info("tab页点击");
    }

    pageable: PageableTableData | LocalPageableTableData;

    constructor(http: HttpClient) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.dataReviser = data => {
            const dataTemp = {
                header: data.header.concat(),
                field: data.field.concat(),
                data: data.data.concat().map(row => {return row.concat()}),
                paging: data.paging
            };
            for(let i = 0; i < 3; i++) {
                dataTemp.header.push(...data.header);
                dataTemp.field.push(...data.field);
                dataTemp.data.forEach((row, i) => row.push(...data.data[i]));
            }
            console.log(data, dataTemp);
            return dataTemp;
        };
        this.pageable.pagingInfo.pageSize = 20;
        this.pageable.fromAjax('mock-data/hr-list');
    }



    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawTab',
    ];
}

@Component({
    selector: 'table-content',
    template: `
        {{tabData}} Content
        <jigsaw-table style="margin-bottom: 10px;" maxHeight="500px" [data]="pageable"></jigsaw-table>
        <jigsaw-pagination
            [data]="pageable"
            [pageSizeOptions]="[5, 10, 20, 50]"
            [searchable]="true"
            [showQuickJumper]="true"
        ></jigsaw-pagination>
    `
})
export class TableContent {
    @Input()
    tabData: string;

    pageable: PageableTableData | LocalPageableTableData;

    constructor(http: HttpClient) {
        this.pageable = new LocalPageableTableData();
        this.pageable.http = http;
        this.pageable.dataReviser = data => {
            const dataTemp = {
                header: data.header.concat(),
                field: data.field.concat(),
                data: data.data.concat().map(row => {return row.concat()}),
                paging: data.paging
            };
            for(let i = 0; i < 3; i++) {
                dataTemp.header.push(...data.header);
                dataTemp.field.push(...data.field);
                dataTemp.data.forEach((row, i) => row.push(...data.data[i]));
            }
            console.log(data, dataTemp);
            return dataTemp;
        };
        this.pageable.pagingInfo.pageSize = 20;
        this.pageable.fromAjax('mock-data/hr-list');
    }
}
