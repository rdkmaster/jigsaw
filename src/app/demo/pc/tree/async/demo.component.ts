import {Component} from "@angular/core";
import {ZTreeSettingSetting} from "jigsaw/pc-components/tree/ztree-types";
import {TreeData} from "jigsaw/common/core/data/tree-data";

@Component({
    templateUrl: 'demo.component.html'
})
export class ZtreeAsynDemoComponent {
    public setting: ZTreeSettingSetting = {
        async: {
            enable: true,
            type: 'get',
            url: (treeId, node) => {
                // 这个demo的运行对环境要求较高，无法模拟。
                // 使用上还是比较简单的，这个函数把参数拼装好，返回一个url，ztree会去调用这个url取得数据。
                // 服务端必须返回类似下面这样的一个数组回来：
                // [
                //     {key: '1', name: 'n1', label: "n1", isParent: true},
                //     {key: '2', name: 'n2', label: "n2", isParent: true},
                //     {key: '3', name: 'n3', label: "n3", isParent: true}
                // ]
                return `the-simulated-tree-data-url?key=${node.key}&name=${node.name}`;
            }
        }
    };

    public data = new TreeData();

    constructor() {
        this.data.fromObject([
            {key: '1', name: 'n1', label: "n1", isParent: true},
            {key: '2', name: 'n2', label: "n2", isParent: true},
            {key: '3', name: 'n3', label: "n3", isParent: true}
        ]);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawTreeExt.setting'
    ];
}
