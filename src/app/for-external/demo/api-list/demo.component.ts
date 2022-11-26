import { HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { DemoSetBase } from "../../template/demo-template/demo-template";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.scss"],
})
export class ApiListComponent extends DemoSetBase implements OnInit {
    public demoPath = "demo/api-list";

    public apiData: string[] = [];
    private _apiData: string[] = [];

    public apiList: { type: string, category: string }[] = require('../../assets/docs/list.json');
    public apiDetail = "";
    public apiCategory = [
        { label: "组件", category: "component" },
        { label: "类型别名", category: "typealias" },
        { label: "指令", category: "directive" },
        { label: "类", category: "class" },
        { label: "可注入", category: "injectable" },
        { label: "接口", category: "interface" },
        { label: "枚举", category: "enum" }
    ];

    public showApiDetail(api) {
        const type = api[0].split("[")[0].slice(0, -1);
        const category = api[0].split("[")[1].slice(0, -1);

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                category: category,
                type: type
            },
            queryParamsHandling: 'merge'
        });
    }

    public getLengthByCategory(category: string): Number {
        return this.apiList.filter(api => api.category === category).length;
    }

    public searchApi(keyword) {
        this.apiData = this._apiData.filter(api => api.toLowerCase().includes(keyword.trim().toLowerCase()));
    }

    ngOnInit() {
        this._apiData = this.apiList.map(api => `${api.type} [${api.category}]`);
        this.apiData = this._apiData;

        this.route.queryParams.subscribe(
            params => {
                if (params['category'] === undefined) {
                    this.apiDetail = "";
                    return;
                }
                const category = params['category'];
                const type = params['type'];
                const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
                this.http
                    .get(`app/for-external/assets/docs/fragments/${category}/${type}.html`, { headers, responseType: 'text' })
                    .subscribe((data) => {
                        this.apiDetail = data;
                    });
            });
    }
}
