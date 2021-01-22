import { Component } from "@angular/core";
import { BreadcrumbNode } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class BreadcrumbHintDemoComponent {
    constructor() {}

    public _$breadcrumbNodes: BreadcrumbNode[] = [
        {
            label: "主页",
            icon: "fa fa-home",
            hint: "点击即可返回主页"
        },
        {
            label: "业务管理",
            hint: "这是业务管理"
        },
        {
            label: "业务清单-1",
            icon:"fa fa-list"
        },
        {
            label: "业务清单-2"
        },
        {
            label: "业务清单-3"
        },
        {
            label: "业务样本",
            hint: "业务样本就是除了业务管理和业务清单以外的内容。"
        }
    ];
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
