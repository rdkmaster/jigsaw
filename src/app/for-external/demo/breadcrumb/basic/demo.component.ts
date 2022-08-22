import { Component } from "@angular/core";
import { BreadcrumbNode } from "jigsaw/public_api";
import { BreadcrumbTextService } from "../doc.service";

@Component({
    selector: 'breadcrumb-basic',
    templateUrl: "./demo.component.html"
})
export class BreadcrumbBasicDemoComponent {
    public breadcrumbItems: any[];

    public itemSelect(item: BreadcrumbNode) {
        console.log("当前点击的节点是：", item);
        const idx = this.breadcrumbItems.findIndex(i => item === i);
        this.breadcrumbItems = this.breadcrumbItems.slice(0, idx + 1);
    }

    constructor(public doc: BreadcrumbTextService) { }
}
