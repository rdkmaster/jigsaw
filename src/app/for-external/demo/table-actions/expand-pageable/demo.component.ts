import { Component, ViewChild } from "@angular/core";
import { JigsawTable, PageableTableData } from "jigsaw/public_api";
import { HttpClient } from '@angular/common/http';
import { TableActionsTextService } from "../doc.service";

@Component({
    selector: 'table-expand-pageable',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TableExpandPageableDemoComponent {
    @ViewChild('tableCmp')
    tableCmp: JigsawTable;

    public action = ['toggle'];
    public pageable: PageableTableData;
    public remainOpen: boolean = false;

    public rowClick(rowIndex: number) {
        console.log(rowIndex)
        const html = this.getExpansionHtml(rowIndex);
        if (!html) {
            return;
        }
        this.tableCmp.expand(rowIndex, html, this, {
            remainOpenAfterDataChanges: this.remainOpen, action: <any>this.action[0]
        });
    }

    public getExpansionHtml(rowIndex: number) {
        const data = this.pageable.data[rowIndex]
        const items = this.pageable.header.map((header, idx) =>
            `<li onclick="showValue('${data[idx]}')">
                <i class="iconfont iconfont-e748"></i>
                <span>${header}：</span>
                <span>${data[idx]}</span>
            </li>`).join('');
        return `
            <style>
                .uid-expand-title {
                    width: 148px;
                }
                .uid-expand-ul {
                    display:flex;
                    flex-direction: column;
                    align-items: start;
                    margin-left: 56px;
                }
                .uid-expand-ul li:hover {
                    background: var(--bg-hover);
                    cursor: pointer;
                }
                .uid-expand-ul li i:hover {
                    color: var(--primary-default)
                }
            </style>
            <p class="uid-expand-title">当前行的详细信息：</p>
            <ul class="uid-expand-ul">
                ${items}
                <li>
                    <i class="iconfont iconfont-e748"></i>
                    <span>更新时间戳：</span>
                    <span>${Date.now()}</span>
                </li>
            </ul>
        `;
    }

    public showValue(value: string) {
        alert('The value is ' + value);
    }

    public updateData() {
        this.pageable = new PageableTableData(this.http, {
            url: 'mock-data/hr-list-full', body: { aa: 11, bb: 22 }, method: 'post'
        });
        this.pageable.pagingInfo.pageSize = 5;
    }

    public resetData() {
        this.pageable = new PageableTableData(this.http, {
            url: 'mock-data/hr-list', body: { aa: 11, bb: 22 }, method: 'post'
        });
        this.pageable.pagingInfo.pageSize = 5;
    }

    public expandRow(rowIndex: number) {
        this.tableCmp.expand(rowIndex, this.getExpansionHtml(2), this, {
            remainOpenAfterDataChanges: this.remainOpen, action: <any>this.action[0]
        });
    }

    constructor(private http: HttpClient, public doc: TableActionsTextService) {
        this.resetData();
    }
}
