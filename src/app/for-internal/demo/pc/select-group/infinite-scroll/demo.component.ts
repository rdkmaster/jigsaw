import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component } from "@angular/core";
import { HttpClientOptions, InfiniteScrollDirectPageableArray, InfiniteScrollLocalPageableArray, InfiniteScrollPageableArray, TableData } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class SelectGroupInfiniteScrollDemoComponent {
    public data: InfiniteScrollLocalPageableArray<any> | InfiniteScrollPageableArray | PluginInfiniteScrollDirectPageableArray;
    public value;
    public searchable = true;
    public disabled = false;
    public multipleSelect = false;
    public optionCount = 5;
    public dataType = [{ label: '本地', id: 1 }, { label: '服务器', id: 2 }, { label: '自定义', id: 3 }];
    public selectedDataType = [{ label: '本地', id: 1 }];

    constructor(public http: HttpClient) {
        this._$resetData();
    }

    public valueChange($event) {
        console.log($event);
    }

    public _$changeData() {
        if (this.selectedDataType[0].id == 1) {
            let array = [];
            for (let i = 1; i <= 100; i++) {
                array.push({ name: "修改数据" + i });
            }
            this.data.fromArray(array);
            return;
        }

        if (this.selectedDataType[0].id == 2) {
            this.data = new InfiniteScrollPageableArray(this.http, {
                url: "mock-data/hr-list",
                params: { aa: 11, bb: 22 },
                method: 'post'
            });
            this.data.pagingInfo.pageSize = 20;
            this.data.fromAjax();
            this.data.dataReviser = (td) => {
                return { data: TableData.toArray(td), paging: td.paging };
            };
        }
    }

    public _$resetData() {
        this._$clearValue();

        if (this.selectedDataType[0].id == 1) {
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

        if (this.selectedDataType[0].id == 2) {
            this.data = new InfiniteScrollPageableArray(this.http, {
                url: "mock-data/hr-list-full",
                params: { aa: 11, bb: 22 },
            });
            this.data.pagingInfo.pageSize = 20;
            this.data.fromAjax();
            this.data.dataReviser = (td) => {
                return { data: TableData.toArray(td), paging: td.paging };
            };
            return;
        }

        if (this.selectedDataType[0].id == 3) {
            this.data = new PluginInfiniteScrollDirectPageableArray(this.http, {
                url: "just-test",
                method: 'get'
            });
            if (this.data instanceof PluginInfiniteScrollDirectPageableArray) {
                this.data.paramGeneratorContext = this;
                this.data.pagingInfo.pageSize = 20;
                this.data.paramGenerator = () => ({
                    test: 'some-test',
                    paging: this.data.pagingInfo.valueOf(),
                    filter: (this.data as PluginInfiniteScrollDirectPageableArray).filterInfo
                });
            }
            this.data.fromAjax();
            return;
        }
    }

    public _$switchData() {
        this._$resetData();
    }

    public _$clearValue() {
        this.value = undefined;
    }

    public _$getDisabledStatus() {
        return this.selectedDataType[0].id == 3;
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

export class PluginInfiniteScrollDirectPageableArray extends InfiniteScrollDirectPageableArray {
    paramGenerator: () => any;
    bodyGenerator: () => any;
    headersGenerator: () => any;
    paramGeneratorContext: any;

    protected _ajax(): void {
        updateSourceRequestOptions(this.sourceRequestOptions, this.paramGenerator, this.bodyGenerator, this.headersGenerator, this.paramGeneratorContext);
        super._ajax();
    }
}

function updateSourceRequestOptions(sourceRequestOptions: HttpClientOptions, paramGenerator: () => any, bodyGenerator: () => any, headersGenerator: () => any, paramGeneratorContext: any): void {
    let params, body, headers;
    if (!!paramGenerator) {
        try {
            params = paramGenerator.apply(paramGeneratorContext);
        } catch (e) {
            params = {};
            console.error("paramGenerator error! ", e);
        }
    }

    if (!!params && Object.keys(params).length > 0){
        sourceRequestOptions.params = params;
    }

    if (!!bodyGenerator) {
        try {
            body = bodyGenerator.apply(paramGeneratorContext);
        } catch (e) {
            body = {};
            console.error("bodyGenerator error! ", e);
        }
    }

    if (!!body && Object.keys(body).length > 0){
        sourceRequestOptions.body = body;
    }

    if (!!headersGenerator) {
        try {
            headers = headersGenerator.apply(paramGeneratorContext);
        } catch (e) {
            headers = {};
            console.error("headersGenerator error! ", e);
        }
    }
    if (!!headers && Object.keys(headers).length > 0) {
        sourceRequestOptions.headers = new HttpHeaders(headers);
    }
}
