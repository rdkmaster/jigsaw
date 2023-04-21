import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { InfiniteScrollLocalPageableArray, InfiniteScrollPageableArray, TableData } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class SelectCollapseInfiniteScrollDemoComponent {
    public data: InfiniteScrollLocalPageableArray<any> | InfiniteScrollPageableArray;
    public value;
    public searchable = true;
    public disabled = false;
    public multipleSelect = false;
    public optionCount = 5;
    public isLocal = true;
    public dataType = [{ label: '本地', id: 1 }, { label: '服务器', id: 2 }];
    public selectedDataType = [{ label: '本地', id: 1 }];

    constructor(public http: HttpClient) {
        this._$resetData();
    }

    public valueChange($event) {
        console.log($event);
    }

    public _$changeData() {
        if (this.isLocal) {
            let array = [];
            for (let i = 1; i <= 100; i++) {
                array.push({ name: "修改数据" + i, gender: "修改分组" });
            }
            this.data.fromArray(array);
            return;
        }
        this.data = new InfiniteScrollPageableArray(this.http, {
            url: "mock-data/hr-list",
            params: { aa: 11, bb: 22 },
            method: 'post'
        });
        this.data.pagingInfo.pageSize = 20;
        this.data.fromAjax();
        this.data.dataReviser = (td) => {
            return { data: TableData.toArray(td), paging : td.paging };
        };
    }

    public _$resetData() {
        this._$clearValue();
        if (this.isLocal) {
            let array = [];
            for (let i = 1; i <= 200; i++) {
                let gender = "其他分组";
                if (i < 20) {
                    gender = "分组1";
                } else if (i < 50) {
                    gender = "分组2";
                } else if (i < 150) {
                    gender = "分组3";
                }
                array.push({ name: "测试选项" + i, gender: gender });
            }
            this.data = new InfiniteScrollLocalPageableArray();
            this.data.fromArray(array);
            this.data.pagingInfo.pageSize = 15;
            return;
        }
        this.data = new InfiniteScrollPageableArray(this.http, {
            url: "mock-data/hr-list-full",
            params: { aa: 11, bb: 22 },
        });
        this.data.pagingInfo.pageSize = 20;
        this.data.fromAjax();
        this.data.dataReviser = (td) => {
            return { data: TableData.toArray(td), paging : td.paging };
        };
    }

    public _$switchData() {
        this.isLocal = !this.isLocal;
        this._$resetData();
    }

    public _$clearValue() {
        this.value = undefined;
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
