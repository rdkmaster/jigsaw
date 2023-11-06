import { Component, OnInit } from "@angular/core";
import { TabStyleOptions } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ['./../../assets/demo.common.css', './demo.component.css']
})
export class TabBarStyleOptionsDemoComponent implements OnInit {
    public tabBarData: Array<string>;

    public styleOptions: TabStyleOptions = {
        tabBarStyles: {
            barStyles: {
                backgroundFill: undefined
            },
            normalStyles: {
                backgroundFill: undefined,
                textColor: undefined
            },
            selectedStyles: {
                backgroundFill: undefined,
                textColor: undefined
            },
            hoverStyles: {
                backgroundFill: undefined,
                textColor: undefined
            },
            disabledStyles: {
                backgroundFill: undefined,
                textColor: undefined
            }
        },
        contentStyles: {
            backgroundFill: undefined
        }
    }

    public backgroundColor: string;

    constructor() {
    }

    ngOnInit() {
        this.tabBarData = ["Tab 1", "Tab 2", `<div><span class="iconfont iconfont-e187"></span>Tab 3</div>`, "Tab 4"];
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "此demo主要展示可编辑的tab";
    description: string = "";
}
