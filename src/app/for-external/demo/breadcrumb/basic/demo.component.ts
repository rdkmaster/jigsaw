import { Component } from "@angular/core";
import { BreadcrumbNode } from "jigsaw/public_api";
import {BreadcrumbTextService} from "../doc.service";

@Component({
    selector: 'breadcrumb-basic',
    templateUrl: "./demo.component.html"
})
export class BreadcrumbBasicDemoComponent {
    breadcrumbItems: any[];

    constructor(public doc: BreadcrumbTextService) {
        this.resetBreadcrumbItems();
    }

    itemSelect(item: BreadcrumbNode) {
        console.log("当前点击的节点是：", item);
        const idx = this.breadcrumbItems.findIndex(i => item === i);
        this.breadcrumbItems = this.breadcrumbItems.slice(0, idx + 1);
    }

    resetBreadcrumbItems() {
        this.breadcrumbItems = [
            { id: 0, label: "Home", icon: "iconfont iconfont-e647" },
            { id: 1, label: "Digital", icon: "iconfont iconfont-e12e" },
            { id: 2, label: "List", icon: "iconfont iconfont-e526" },
            { id: 3, label: "Detail", icon: "iconfont iconfont-e385" }
        ];
    }
}
