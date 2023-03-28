import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { LocalPageableSelectArray, PageableSelectArray } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class SelectGroupInfiniteScrollDemoComponent {
    public data: LocalPageableSelectArray<any> | PageableSelectArray;
    public value;
    public searchable = true;
    public disabled = false;
    public multipleSelect = false;
    public optionCount = 5;
    public isLocal = true;

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
        this.data = new PageableSelectArray(this.http, {
            url: "mock-data/hr-list",
            params: { aa: 11, bb: 22 },
            method: 'post'
        });
        this.data.pagingInfo.pageSize = 20;
        this.data.fromAjax();
    }

    public _$resetData() {
        if (this.isLocal) {
            let array = [];
            for (let i = 1; i <= 1000; i++) {
                array.push({ name: "测试选项" + i });
            }
            this.data = new LocalPageableSelectArray();
            this.data.fromArray(array);
            this.data.pagingInfo.pageSize = 15;
            return;
        }
        this.data = new PageableSelectArray(this.http, {
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
