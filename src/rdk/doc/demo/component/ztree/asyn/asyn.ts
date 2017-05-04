import {Component} from "@angular/core";
import {ZTreeSettingSetting} from "../../../../../component/ztree/ztree-types"
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {TreeData} from "../../../../../core/data/tree-data";

@Component({
    templateUrl: 'asyn.html'
})
export class ZtreeAsynDemoComponent {
    public setting: ZTreeSettingSetting = {
        async: {
            enable: true,
            type: 'get',
            url: function (treeId, node) {
                //由于这个demo的运行环境比较复杂导致这个url比实际开发时的url要复杂一些
                //实际开发时的url类似这样  /rdk/service/app/example/server/my_service?p={"param":$param}
                var url = '/rdk/service/app/common/relay?p={"param":{"service":"../doc/client/demo/comprehensive/tree/lazy_load/web/mock/data.js"'
                    + ',"param":$param},"app":"common"}';
                let obj={};
                if(node){
                    obj = {key: node.key, name: node.name};
                }

                return encodeURI(url.replace('$param', JSON.stringify(obj)));

            },
            dataFilter: function (treeId, parentNode, responseData) {
                if (responseData.hasOwnProperty('result')) {
                    //这看起来像是一个RDK服务返回的数据
                    //RDK的服务返回的数据结构统一为 { result: "xxx" }
                    //其中 xxx 部分是实际的应答json字符串，把这个字符串转为json对象就好了
                    return eval('(' + responseData.result + ')');
                } else {
                    //非RDK服务的应答数据，结构未知，直接返回
                    return responseData;
                }
            }
        }
    };

    public data = new TreeData();

    constructor() {
        this.data.fromObject([
           {key: '1', name: 'n1', label:"n1",isParent: true},
            {key: '2', name: 'n2', label:"n2",isParent: true},
            {key: '3', name: 'n3', label:"n3",isParent: true}
         ]);
    }

}
