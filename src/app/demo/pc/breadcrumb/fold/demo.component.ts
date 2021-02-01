import { Component, Input } from "@angular/core";
import { BreadcrumbNode } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class BreadcrumbFoldDemoComponent {
    constructor() {}

    public breadcrumbNodes: BreadcrumbNode[] = [
        {
            label: "主页",
            icon: "fa fa-home"
        },
        {
            label: "业务管理"
        },
        {
            label: "业务清单-1"
        },
        {
            label: "业务清单-2"
        },
        {
            label: "业务清单-3"
        },
        {
            label: "业务样本"
        }
    ];

    public foldThreshold = 4;
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
