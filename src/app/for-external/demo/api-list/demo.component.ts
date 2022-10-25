import { HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { DemoSetBase } from "../../template/demo-template/demo-template";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.scss"],
})
export class ApiListComponent extends DemoSetBase implements OnInit {
    public demoPath = "demo/api-list";

    public apiList = window["demoApiList"];
    public apiData: string[] = [];
    public apiDetail = '';

    public showApiDetail(api) {
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        const type = api[0].split("[")[0].slice(0, -1);
        const category = api[0].split("[")[1].slice(0, -1);

        this.http.get(`app/for-external/assets/docs/fragments/${category}/${type}.html`, { headers, responseType: 'text' }).subscribe((data) => {
            this.apiDetail = data;
        })
    }

    ngOnInit() {
        this.apiList.forEach(api => {
            this.apiData.push(`${api.type} [${api.category}]`);
        })
    }
}
