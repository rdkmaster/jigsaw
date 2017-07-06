import {Component} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {TreeData} from "jigsaw/core/data/tree-data";

@Component({
    templateUrl: 'basic.html'
})
export class ZtreeDemoComponent {
    public data: TreeData;

    constructor(public http: Http) {
        this.data = new TreeData();
        this.data.fromObject([
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

        ])
    }

    public onClick(msg: any) {
        console.log("click");
        console.log(msg);
    }



}
