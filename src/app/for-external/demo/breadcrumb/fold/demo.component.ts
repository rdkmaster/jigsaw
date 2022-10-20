import { Component } from "@angular/core";
import { BreadcrumbNode } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'breadcrumb-multi-level',
    templateUrl: "./demo.component.html"
})
export class BreadcrumbFoldDemoComponent extends AsyncDescription {
    public demoPath = "demo/breadcrumb/fold";

    public foldThreshold = 4;
    public data: (string | BreadcrumbNode)[] = [
        { label: "主页", icon: "iconfont iconfont-e647" },
        // 当节点只有文本时，也可以直接给字符串，这样更便捷
        "业务管理", "业务清单-1", "业务清单-2", "业务清单-3",
        // 也支持label属性
        { label: "业务样本" }
    ];
}
