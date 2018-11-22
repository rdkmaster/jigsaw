import {Component} from "@angular/core";
import {ProductService} from "./product.service";
import {BreadcrumbRouteConfig} from "jigsaw/component/breadcrumb/breadcrumb";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        h3 {
            font-size: 16px;
            color: #333;
            margin-bottom: 6px;
        }

        p {
            margin-bottom: 4px;
        }

        j-breadcrumb {
            margin-bottom: 12px;
        }
    `]
})
export class BreadcrumbRouterDemoComponent {
    constructor(public productService: ProductService) {
    }

    routes: BreadcrumbRouteConfig[] = [
        {'breadcrumb/router': {label: 'Product List', icon: 'fa fa-list'}},
        {'breadcrumb/router/fruits': (routeNode: string) => ({label: 'Fruits', icon: this.productIconGenerator(routeNode)})},
        {'breadcrumb/router/fruits/detail/*': {label: this.detailLabelGenerator}},
        {'breadcrumb/router/fruits/detail/*/buy': {label: 'Buy', icon: 'fa fa-shopping-cart'}},
        {'breadcrumb/router/digital': {label: 'Digital', icon: this.productIconGenerator}},
        {'breadcrumb/router/digital/*': {label: this.detailLabelGenerator}},
        {'breadcrumb/router/digital/*/buy': {label: 'Buy', icon: 'fa fa-shopping-cart'}}
    ];

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

