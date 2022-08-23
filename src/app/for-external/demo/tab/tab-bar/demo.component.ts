import { Component, OnInit } from "@angular/core";
import { TabTextService } from "../doc.service";
import { HttpClient } from "@angular/common/http";
import { TabBarData } from "jigsaw/public_api";

@Component({
    selector: "tab-tab-bar",
    templateUrl: "./demo.component.html",
})

export class TabTabBarComponent implements OnInit {
    public tabBarData: Array<string>;
    public tabBarData2: TabBarData[];
    public selectedIndex = 0;

    ngOnInit() {
        this.tabBarData = ["Tab 1", "Tab 2", `<div><span class="iconfont iconfont-e187"></span>Tab 3</div>`, "Tab 4"];
        this.tabBarData2 = [
            {
                label: "Tab 1",
                icon: "iconfont iconfont-e105"
            },
            {
                label: "Tab 2",
                disabled: true
            },
            {
                html: `<div><span class="iconfont iconfont-e187"></span>Tab 3</div>`
            },
            {
                html: `<span>更多</span>`,
            },
            {
                label: "Tab 5",
                hidden: true
            }
        ];
    }

    constructor(public http: HttpClient, public doc: TabTextService) {
    }
}
