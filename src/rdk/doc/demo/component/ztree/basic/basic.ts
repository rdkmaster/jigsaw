import {Component, OnInit} from "@angular/core";
import {TreeData} from "../../../../../component/ztree/ztree-ext"
import {ZTreeSettingSetting} from "../../../../../component/ztree/ztree-types"
import {Headers, Http, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
    template: `
        <rdk-tree-ext [(setting)]="setting1"
                      [(data)]="data1"
                      (onClick)="onClick($event)"
                      (beforeExpand)="beforeExpand($event)"
                      (onDblClick)="onDblClick($event)"
                      (beforeCollapse)="beforeCollapse($event)"
                      (beforeRename)="beforeRename($event)"
                      (onRename)="onRename($event)">
        </rdk-tree-ext>
        <br/>
        <label>从后端取数据</label>
        <!--rdk-tree-ext [(setting)]="setting2"
                      [(data)]="data2"
                      (onRename)="onRename($event)">
        </rdk-tree-ext-->
        <br/>
    `
})
export class ZtreeDemoComponent implements OnInit {
    public setting1: ZTreeSettingSetting = {};
    public data1: TreeData[] = [
        {
            label: "父节点1 - 展开",
            open: true,
            nodes: [
                {
                    label: "父节点11 - 折叠",
                    nodes: [
                        {label: "叶子节点111"},
                        {label: "叶子节点112"},
                        {label: "叶子节点113"},
                        {label: "叶子节点114"}
                    ]
                },
                {
                    label: "父节点12 - 折叠",
                    nodes: [
                        {label: "叶子节点121"},
                        {label: "叶子节点122"},
                        {label: "叶子节点123"},
                        {label: "叶子节点124"}
                    ]
                },
                {label: "父节点13 - 没有子节点", isParent: true}
            ]
        },
        {
            label: "父节点2 - 折叠",
            nodes: [
                {
                    label: "父节点21 - 展开", open: true,
                    nodes: [
                        {label: "叶子节点211"},
                        {label: "叶子节点212"},
                        {label: "叶子节点213"},
                        {label: "叶子节点214"}
                    ]
                },
                {
                    label: "父节点22 - 折叠",
                    nodes: [
                        {label: "叶子节点221"},
                        {label: "叶子节点222"},
                        {label: "叶子节点223"},
                        {label: "叶子节点224"}
                    ]
                },
                {
                    label: "父节点23 - 折叠",
                    nodes: [
                        {label: "叶子节点231"},
                        {label: "叶子节点232"},
                        {label: "叶子节点233"},
                        {label: "叶子节点234"}
                    ]
                }
            ]
        },
        {label: "父节点3 - 没有子节点", isParent: true}

    ];
    public currentRenameLabel: string;
    public afterRenameLabel: string;

    public setting2: ZTreeSettingSetting = {
        data: {
            key: {
                children: 'nodes',
                name: 'label'
            }
        },
        view: {
            fontCss: this.getFont,
            nameIsHTML: true
        }

    };

    public getFont(treeId, node) {
        return node.font ? node.font : {};
    }

    public data2: TreeData[] = [];

    public beforeExpand(msg: any) {
        console.log("beforeExpand");
        console.log(msg);
    }

    public beforeCollapse(msg: any) {
        console.log("beforeCollapse");
        console.log(msg);
    }

    public onClick(msg: any) {
        console.log("click");
        console.log(msg);
    }

    public onDblClick(msg: any) {
        console.log("onDblClick");
        console.log(msg);
    }

    public beforeRename(msg: any) {
        console.log("beforeRename");
        console.log(msg);
        this.currentRenameLabel = msg.treeNode.label;
    }

    public onRename(msg: any) {
        console.log("onRename");
        this.afterRenameLabel = msg.treeNode.label;
        this.findLabel(this.data1,this.currentRenameLabel,this.afterRenameLabel);
        this.setTreeData();
    }

    public findLabel(data:TreeData[],oldLabel: string,newLabel: string) {
        loop(data);
        function loop(arr){
            for(let i=0;i<arr.length;i++){
                let current=arr[i];
                if(current.hasOwnProperty("label") && current.label==oldLabel){
                    current.label=newLabel;
                }
                if(current.hasOwnProperty("nodes")){
                    loop(current.nodes);
                }
            }
        }

    }

    constructor(public http: Http) {}

    public setTreeData() {
        //todo post修改这个地方
        // let headers = new Headers({'Content-Type': 'application/json'});
        // let options = new RequestOptions({headers: headers});
        // this.http.post("src/rdk/doc/demo/component/ztree/basic/data.json", JSON.stringify(this.data1),options)
        //     .toPromise()
        //     .then(response => {
        //         this.data1 = response.json() as TreeData[];
        //         console.log(JSON.stringify(this.data1));
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         return Promise.reject(error);
        //     });

    }

    public getTreeData() {
        this.http.get("mock-data/tree/data.json")
            .toPromise()
            .then(response => {
                this.data2 = response.json() as TreeData[];
            })
            .catch((error) => {
                console.error(error);
                return Promise.reject(error);
            });
    }

    ngOnInit() {
        this.getTreeData();
    }
}
