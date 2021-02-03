import { Component } from "@angular/core";
import { BreadcrumbNode } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class BreadcrumbBasicDemoComponent {
    breadcrumbItems: any[];

    constructor() {
        this.resetBreadcrumbItems();
    }

    itemSelect(item: BreadcrumbNode) {
        console.log("当前点击的节点是：", item);
    }

    resetBreadcrumbItems() {
        this.breadcrumbItems = [
            { id: 0, label: "Home", icon: "iconfont iconfont-e647" },
            { id: 1, label: "Digital", icon: "iconfont iconfont-e12e" },
            { id: 2, label: "List", icon: "iconfont iconfont-e526" },
            { id: 3, label: "Detail", icon: "iconfont iconfont-e385" }
        ];
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "高定制性的面包屑，理论上可以完成任何导航场景，代价是需要自行控制，" + '参考<a href="/breadcrumb/router">这个demo</a>使用自动控制的面包屑。';
    description: string = "";
}
