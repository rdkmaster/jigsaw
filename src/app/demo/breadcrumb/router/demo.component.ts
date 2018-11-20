import {Component} from "@angular/core";
import {BreadcrumbData} from "jigsaw/core/data/breadcrumb-data";
import {ProductService} from "./product.service";

@Component({
    templateUrl: './demo.component.html'
})
export class BreadcrumbRouterDemoComponent {
    constructor(public productService: ProductService) {
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
                                icon: this.productIconGenerator,
                                nodes: [
                                    {
                                        route: 'detail',
                                        visible: false,
                                        nodes: [
                                            {
                                                label: this.detailLabelGenerator,
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
                                icon: this.productIconGenerator,
                                nodes: [
                                    {
                                        label: this.detailLabelGenerator,
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

    detailLabelGenerator(routeNode: string) {
        return this.productService.getProductById(parseInt(routeNode)).name;
    };

    productIconGenerator(routeNode: string) {
        switch (routeNode) {
            case 'fruits':
                return 'fa fa-lemon-o';
            case 'digital':
                return 'fa fa-camera';
            default:
                return '';
        }
    };

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [];
}

