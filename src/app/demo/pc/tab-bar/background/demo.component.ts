import { Component, OnInit } from "@angular/core";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class TabBarBackgroundDemoComponent implements OnInit {
    tabBarData: Array<string>;

    ngOnInit() {
        this.tabBarData = ["Tab 1", "Tab 2", `<div><span class="iconfont iconfont-e187"></span>Tab 3</div>`, "Tab 4", "Tab 5", "Tab 6", "Tab 7"];
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "此demo主要展示自定义背景的tab-bar";
    description: string = "";
}
