import {Component, OnInit} from "@angular/core";
import {TabBarTextService} from "../text.service";

@Component({
    selector: "background-tabBar",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class TabBarBackgroundComponent implements OnInit{
    tabBarData: Array<string>;
    constructor(public text: TabBarTextService){}
    ngOnInit() {
        this.tabBarData = ["Tab 1", "Tab 2", `<div><span class="iconfont iconfont-e187"></span>Tab 3</div>`, "Tab 4", "Tab 5", "Tab 6", "Tab 7"];
    }
}
