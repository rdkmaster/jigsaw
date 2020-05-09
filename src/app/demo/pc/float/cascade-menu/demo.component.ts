import {Component} from "@angular/core";
import {SimpleTreeData} from "jigsaw/common/core/data/tree-data";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .menu {
            margin: 100px;
            border: 1px solid #999;
            padding: 2px 10px;
            border-radius: 3px;
        }
    `]
})
export class CascadingMenuDemo {
    public data: SimpleTreeData;

    public settings: MenuListSettings = {
        width: 200,
        height: 120
    };

    constructor() {
        this.data = new SimpleTreeData();
        this.data.fromObject([
            {
                label: "Settings",
                open: true,
                nodes: [
                    {
                        label: "子菜单11",
                        nodes: [
                            {
                                label: "子菜单111",
                                titleIcon: "fa fa-angle-right",
                                subTitle: "cccc",
                                subTitleIcon: "fa fa-angle-right",
                                // click: () => {
                                //     console.log("叶子节点111 被点击了！！！");
                                // }
                            },
                            {label: "子菜单112"},
                            {label: "子菜单113"},
                            {label: "子菜单114"}
                        ]
                    },
                    {
                        label: "子菜单12",
                        nodes: [
                            {label: "子菜单121"},
                            {label: "子菜单122"},
                            {label: "子菜单123"},
                            {label: "子菜单124"}
                        ]
                    },
                    {label: "子菜单13 - 没有子节点", isParent: true}
                ]
            },
            {
                label: "Print",
                nodes: [
                    {
                        label: "子菜单21", open: true,
                        disabled: true,
                        nodes: [
                            {label: "子菜单211"},
                            {label: "子菜单212"},
                            {label: "子菜单213"},
                            {label: "子菜单214"}
                        ]
                    },
                    {
                        label: "子菜单22",
                        nodes: [
                            {label: "子菜单221"},
                            {label: "子菜单222"},
                            {label: "子菜单223"},
                            {label: "子菜单224"}
                        ]
                    },
                    {
                        label: "子菜单23",
                        nodes: [
                            {label: "子菜单231"},
                            {label: "子菜单232"},
                            {label: "子菜单233"},
                            {label: "子菜单234"}
                        ]
                    }
                ]
            },
            {label: "Exit", isParent: true}

        ]);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了jigsaw-cascading-menu指令实现多级菜单，输入为一个simpleTree类型的菜单数据，实现多级菜单弹出和点击的功能';
    description: string = '';
}
