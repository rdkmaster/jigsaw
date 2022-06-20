import { Component, ViewChild } from "@angular/core";
import { JigsawTable, PageableTableData } from "jigsaw/public_api";
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TableExpandPageableDemoComponent {
    action = ['toggle'];
    pageable: PageableTableData;
    remainOpen: boolean = false;

    @ViewChild('tableCmp')
    tableCmp: JigsawTable;

    constructor(private http: HttpClient) {
        this.resetData();
    }

    rowClick(rowIndex: number) {
        console.log(rowIndex)
        const html = this.getExpansionHtml(rowIndex);
        if (!html) {
            return;
        }
        this.tableCmp.expand(rowIndex, html, this, {
            remainOpenAfterDataChanges: this.remainOpen, action: <any>this.action[0]
        });
    }

    getExpansionHtml(rowIndex: number) {
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

    showValue(value: string) {
        alert('The value is ' + value);
    }

    updateData() {
        this.pageable = new PageableTableData(this.http, {
            url: 'mock-data/hr-list-full', body: { aa: 11, bb: 22 }, method: 'post'
        });
        this.pageable.pagingInfo.pageSize = 5;
    }

    resetData() {
        this.pageable = new PageableTableData(this.http, {
            url: 'mock-data/hr-list', body: { aa: 11, bb: 22 }, method: 'post'
        });
        this.pageable.pagingInfo.pageSize = 5;
    }

    expandRow(rowIndex: number) {
        this.tableCmp.expand(rowIndex, this.getExpansionHtml(2), this, {
            remainOpenAfterDataChanges: this.remainOpen, action: <any>this.action[0]
        });
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
