import {Component} from "@angular/core";
import {ProductService} from "./product.service";
import {BreadcrumbNode, BreadcrumbRouteConfig} from "jigsaw/component/breadcrumb/breadcrumb";

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
        {'breadcrumb/router/fruits': {label: 'Fruits', icon: 'fa fa-lemon-o'}},
        {'breadcrumb/router/fruits/detail/*': this.detailBreadcrumbGenerator},
        {'breadcrumb/router/fruits/detail/*/buy': {label: 'Buy', icon: 'fa fa-shopping-cart'}},
        {'breadcrumb/router/digital': {label: 'Digital', icon: 'fa fa-camera'}},
        {'breadcrumb/router/digital/*': this.detailBreadcrumbGenerator},
        {'breadcrumb/router/digital/*/buy': {label: 'Buy', icon: 'fa fa-shopping-cart'}}
    ];

    detailBreadcrumbGenerator(routeNode: string): BreadcrumbNode {
        return {label: this.productService.getProductById(parseInt(routeNode)).name};
    };

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [];
}

