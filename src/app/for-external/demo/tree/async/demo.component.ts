import {Component} from "@angular/core";
import {ZTreeSettings, SimpleTreeData, ArrayCollection} from "jigsaw/public_api";
import {TreeTextService} from "../doc.service";

declare const $:any;

const lazyLoadUrl = '/rdk/service/app/ztree-async/server/lazy';

@Component({
    selector: 'tree-async',
    templateUrl: 'demo.component.html'
})
export class ZTreeAsyncDemoComponent {
    public selectedSize = {label: "中", size: "medium"};
    public labelData: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "large"}
    ]);

    public setting: ZTreeSettings = {
        async: {
            enable: true,
            type: 'get',
            url: (treeId, node) => {
                // 注意，这个ajax请求的结果是在浏览器里模拟出来的，模拟逻辑请看本demo的最后部分代码
                // 服务端必须返回类似下面这样的一个数组回来：
                // [
                //     {key: '1', name: 'n1', label: "n1", isParent: true},
                //     {key: '2', name: 'n2', label: "n2", isParent: true},
                //     {key: '3', name: 'n3', label: "n3", isParent: true}
                // ]
                return `${lazyLoadUrl}?key=${node.key}&name=${node.name}`;
            }
        }
    };

    public data = new SimpleTreeData();

    constructor(public doc: TreeTextService) {
        this.data.fromObject([
            {key: '1', name: 'n1', label: "n1", isParent: true},
            {key: '2', name: 'n2', label: "n2", isParent: true},
            {key: '3', name: 'n3', label: "n3", isParent: true}
        ]);
    }
}

// monkey patch jquery ajax to simulate a ajax lazy load response.
const realAjax = $.ajax;
$.ajax = function(info) {
    if (!info || info.url.indexOf(lazyLoadUrl) == -1) {
        return realAjax.apply(this, arguments);
    } else {
        // 这里在模拟rest服务端的逻辑，你只要关注返回的数据结构即可
        // 数组的获取过程大可不必关注，真正的服务端很可能是去查数据库得到的数据
        const nodeName = info.url.match(/\bname=(.*?)($|&)/)[1];
        const nodeKey = info.url.match(/\bkey=(.*?)($|&)/)[1];
        const isParent = nodeName.length < 3;
        const simulated = [
            {key: nodeKey + '1', name: nodeName + '1', isParent: isParent},
            {key: nodeKey + '2', name: nodeName + '2', isParent: isParent},
            {key: nodeKey + '3', name: nodeName + '3', isParent: isParent},
        ];
        console.log('The xhr is hijacked! The simulated data is', simulated);
        setTimeout(function() {
            // 模拟网络延迟
            info.success.apply(this, [simulated]);
        }, Math.random() * 2000);
    }
}
