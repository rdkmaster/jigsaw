import {Component} from "@angular/core";
import {BreadcrumbNode, BreadcrumbRouteConfig} from "jigsaw/public_api";
import {ProductService} from "./product.service";
import {BreadcrumbTextService} from "../text.service";

@Component({
    selector: 'router-breadcrumb',
    templateUrl: './demo.component.html',
    styles: [`
        .demo-container h3 {
            font-size: 16px;
            color: #333;
            margin-bottom: 6px;
        }

        .demo-container p {
            margin-bottom: 4px;
        }

        .demo-container j-breadcrumb {
            margin-bottom: 12px;
        }
    `]
})
export class BreadcrumbRouterDemoComponent {
    constructor(public productService: ProductService, public text: BreadcrumbTextService) {
    }

    routes: BreadcrumbRouteConfig[] = [
        {'/pc/breadcrumb/all': {label: 'Product List', icon: 'iconfont iconfont-e12e'}},
        {'/pc/breadcrumb/all/list/*': this.listBreadcrumbGenerator},
        {'/pc/breadcrumb/all/detail/*': this.detailBreadcrumbGenerator},
        {'/pc/breadcrumb/all/buy/*': this.buyBreadcrumbGenerator},
    ];

    listBreadcrumbGenerator(routeNode: string): BreadcrumbNode | BreadcrumbNode[] {
        return this.getListNode(parseInt(routeNode));
    }

    detailBreadcrumbGenerator(routeNode: string): BreadcrumbNode | BreadcrumbNode[] {
        // routeNode指当前url的最后一个节点，比如url为breadcrumb/router/detail/1这边的routeNode是1
        const detail = this.productService.getProductById(parseInt(routeNode));
        // 自定义面包屑节点
        return [
            // 节点的顺序是面包屑从左往右的显示顺序
            this.getListNode(detail.typeId),
            {label: detail.name}
        ];
    };

    buyBreadcrumbGenerator(routeNode: string): BreadcrumbNode | BreadcrumbNode[] {
        // routeNode指当前url的最后一个节点，比如url为breadcrumb/router/buy/1这边的routeNode是1
        const detail = this.productService.getProductById(parseInt(routeNode));
        // 自定义面包屑节点
        return [
            // 节点的顺序是面包屑从左往右的显示顺序
            this.getListNode(detail.typeId),
            this.getDetailNode(detail),
            {label: 'Buy', icon: 'iconfont iconfont-e385'}
        ];
    }

    getDetailNode(detail) {
        return {label: detail.name, routeLink: '/pc/breadcrumb/all/detail/' + detail.id} // 请尽量使用绝对路径
    }

    getListNode(typeId) {
        let listNode;
        switch (typeId) {
            case 0:
                listNode = {label: 'Fruits', icon: 'iconfont iconfont-e135'};
                break;
            case 1:
                listNode = {label: 'Digital', icon: 'iconfont iconfont-e12e'};
                break;
            default:
                listNode = {label: 'Fruits', icon: 'iconfont iconfont-e135'};
        }
        listNode.routeLink = '/pc/breadcrumb/all/list/' + typeId; // 请尽量使用绝对路径
        return listNode;
    }

    productTypeList = [
        {id: 0, name: 'Fruits'},
        {id: 1, name: 'Digital'}
    ];
}
