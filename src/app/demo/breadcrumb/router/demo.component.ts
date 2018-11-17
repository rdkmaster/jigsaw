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
                route: 'breadcrumb',
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
                                        route: 'detail',
                                        visible: false,
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

