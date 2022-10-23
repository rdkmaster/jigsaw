import { Component, OnInit } from "@angular/core";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.scss"],
})
export class ApiListComponent {
    public demoPath = "demo/api-list";

    public apiList = [];
    constructor() {
        this.apiList = window["demoApiList"];
        console.log(this.apiList);
    }
}
