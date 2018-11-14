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
                label: '面包屑',
                route: 'breadcrumb',
                routeLink: '/breadcrumb/router',
                nodes: [
                    {
                        label: '路由-案例列表',
                        route: 'router',
                        nodes: [
                            {
                                label: '案例一',
                                route: 'demo1'
                            },
                            {
                                label: '案例二',
                                route: 'demo2'
                            }
                        ]
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

