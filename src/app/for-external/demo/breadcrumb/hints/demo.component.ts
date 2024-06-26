import { Component } from "@angular/core";
import { BreadcrumbNode } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'breadcrumb-hints',
    templateUrl: "./demo.component.html"
})
export class BreadcrumbHintDemoComponent extends AsyncDescription {
    public demoPath = "demo/breadcrumb/hints";

    public data: BreadcrumbNode[] = [
        {
            label: "主页",
            icon: "iconfont iconfont-e647",
            hint: "点击即可返回主页"
        },
        {
            label: "业务管理",
            hint: "这是业务管理"
        },
        {
            label: "业务清单-1",
            icon: "iconfont iconfont-e526"
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
}
