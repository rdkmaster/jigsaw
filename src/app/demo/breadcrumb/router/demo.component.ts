import {Component} from "@angular/core";
import {TreeData} from "jigsaw/core/data/tree-data";

@Component({
    templateUrl: './demo.component.html'
})
export class BreadcrumbRouterDemoComponent {
    constructor() {
        this.routes = new TreeData();
        this.routes.fromObject([
            {
                label: '提示框',
                route: 'alert',
                nodes: [
                    {
                        label: '弹出',
                        route: 'popup'
                    },
                    {
                        label: '在文档里',
                        route: 'in-dom'
                    },
                    {
                        label: '自定义',
                        route: 'customized'
                    }
                ]
            },
            {
                label: 'breadcrumb',
                nodes: [
                    {
                        label: '基本用法',
                        route: 'basic',
                    },
                    {
                        label: '路由',
                        route: 'router'
                    }
                ]
            }
        ]);
    }

    routes: TreeData;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [];
}

