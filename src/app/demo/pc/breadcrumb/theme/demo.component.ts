import { Component } from "@angular/core";
import { BreadcrumbNode } from "jigsaw/public_api";
import {BreadcrumbTextService} from "../text.service";

@Component({
    selector: 'theme-breadCrumb',
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class BreadcrumbModeDemoComponent {
    public data: (string | BreadcrumbNode)[];

    constructor(public text: BreadcrumbTextService) {
        this.resetBreadcrumbItems();
    }

    public itemSelect(item: BreadcrumbNode) {
        console.log("当前点击的节点是：", item);
        const idx = this.data.findIndex(i => item === i);
        this.data = this.data.slice(0, idx + 1);
    }

    public resetBreadcrumbItems() {
        this.data = [
            { label: "主页", icon: "iconfont iconfont-e647" },
            // 当节点只有文本时，也可以直接给字符串，这样更便捷
            "业务管理",
            "业务清单-1",
            "业务清单-2",
            "业务清单-3",
            // 也支持label属性
            { label: "业务样本" }
        ];
    }
}
