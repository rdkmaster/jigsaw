import {Component} from "@angular/core";
import {BreadcrumbData} from "jigsaw/core/data/breadcrumb-data";

@Component({
    templateUrl: './demo.component.html'
})
export class BreadcrumbRouterDemoComponent {
    constructor() {
        this.routes = new BreadcrumbData();
        this.routes.fromObject([
            {
                route: 'breadcrumb',
                visible: false,
                nodes: [
                    {
                        label: 'Product List',
                        route: 'router',
                        icon: 'fa fa-list',
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
                                                        route: 'buy',
                                                        icon: 'fa fa-shopping-cart'
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
                                                route: 'buy',
                                                icon: 'fa fa-shopping-cart'
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

    routes: BreadcrumbData;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [];
}

