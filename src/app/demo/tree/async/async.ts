import {Component} from "@angular/core";
import {ZTreeSettingSetting} from "jigsaw/component/tree/ztree-types";
import {TreeData} from "jigsaw/core/data/tree-data";

@Component({
    templateUrl: 'async.html'
})
export class ZtreeAsynDemoComponent {
    public setting: ZTreeSettingSetting = {
        async: {
            enable: true,
            type: 'get',
            url: function (treeId, node) {
                //由于这个demo的运行环境比较复杂导致这个url比实际开发时的url要复杂一些
                //实际开发时的url类似这样  /rdk/service/app/example/server/my_service?param=$param
                let url = '/rdk/service/app/common/relay?' +
                    'service=../doc/client/demo/comprehensive/tree/lazy_load/web/mock/data.js&param=$param';
                let obj = {};
                if (node) {
                    obj = {key: node.key, name: node.name};
                }

                return encodeURI(url.replace('$param', JSON.stringify(obj)));
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

}
