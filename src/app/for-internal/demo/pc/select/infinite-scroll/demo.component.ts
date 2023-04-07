import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { InfiniteScrollLocalPageableArray, InfiniteScrollPageableArray } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class SelectInfiniteScrollDemoComponent {
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
                array.push({ name: "修改数据" + i });
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
    }

    public _$resetData() {
        this.value = undefined;
        if (this.isLocal) {
            let array = [];
            for (let i = 1; i <= 1000; i++) {
                array.push({ name: "测试选项" + i });
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
