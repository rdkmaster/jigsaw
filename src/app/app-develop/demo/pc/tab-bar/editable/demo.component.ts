import { Component, OnInit } from "@angular/core";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class TabBarEditableDemoComponent implements OnInit {
    tabBarData: Array<string>;

    ngOnInit() {
        this.tabBarData = ["Tab 1", "Tab 2", `<div><span class="iconfont iconfont-e187"></span>Tab 3</div>`, "Tab 4", "Tab 5", "Tab 6", "Tab 7"];
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "此demo展示通过设置backgroundColor属性，达到页签与背景色完美融合在一起的效果。";
    description: string = "";
}
