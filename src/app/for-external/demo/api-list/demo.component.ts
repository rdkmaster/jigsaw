import { HttpHeaders } from "@angular/common/http";
import { Component } from "@angular/core";
import { DemoSetBase } from "../../template/demo-template/demo-template";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.scss"],
})
export class ApiListComponent extends DemoSetBase {
    public demoPath = "demo/api-list";

    public apiList = window["demoApiList"];
    public apiDetail = '';

    public showApiDetail(api) {
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        this.http.get(`app/for-external/assets/docs/fragments/${api.category}/${api.type}.html`, { headers, responseType: 'text' }).subscribe((data) => {
            this.apiDetail = data; 
        })
    }

    
}
