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
                visible: false,
                nodes: [
                    {
                        label: 'Product List',
                        route: 'router',
                        nodes: [
                            {
                                label: 'Fruits',
                                route: 'fruits',
                                nodes: [
                                    {
                                        label: 'Detail',
                                        route: 'detail/*',
                                        nodes: [
                                            {
                                                label: 'Buy',
                                                route: 'buy'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                label: 'Digital',
                                route: 'digital',
                                nodes: [
                                    {
                                        label: 'Detail',
                                        route: '*',
                                        nodes: [
                                            {
                                                label: 'Buy',
                                                route: 'buy'
                                            }
                                        ]
                                    }
                                ]
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

