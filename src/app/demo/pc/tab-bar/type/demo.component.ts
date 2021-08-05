import {Component, OnInit} from "@angular/core";
import {JigsawMenu, SimpleTreeData, TabBarData} from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class TabBarTypeDemoComponent implements OnInit {
    tabBarData: Array<string>;
    tabBarData2: TabBarData[];
    menuData: SimpleTreeData;

    public _$more() {
        const mouseEvent: MouseEvent = window.event || arguments[0];
        console.log("more button is clicked: ", mouseEvent);
        JigsawMenu.show(mouseEvent, { data: this.menuData, width: 150 }, this.menuSelect.bind(this));
    }

    menuSelect(node: SimpleTreeData) {
        alert(`${node.label} 被点击了!!!`);
    }

    constructor() {
        this.menuData = new SimpleTreeData();
        this.menuData.fromXML(`
            <node>
                <node label="功能1"></node>
                <node label="功能2"></node>
                <node label="功能3"></node>
                <node label="功能4"></node>
            </node>
        `);
    }

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
                html: `
                    <span>更多</span>
                    <span (click)="_$more()" class="tab-icon-more iconfont iconfont-e2b7"></span>
                `,
                htmlContext: this
            },
            {
                label: "Tab 5",
                hidden: true
            }
        ];
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "此demo主要展示可编辑的tab";
    description: string = "";
}
