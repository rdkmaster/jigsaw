import {Component, ElementRef} from "@angular/core";
import { BreadcrumbNode, BreadcrumbRouteConfig } from "jigsaw/public_api";
import { ProductService } from "./product.service";
import {AsyncDescription} from "../../../template/demo-template/demo-template";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'breadcrumb-router',
    templateUrl: './demo.component.html'
})
export class BreadcrumbRouterDemoComponent extends AsyncDescription {
    public demoPath = "demo/breadcrumb/router";

    public routes: BreadcrumbRouteConfig[] = [
        { '/pc/breadcrumb': { label: 'Product List', icon: 'iconfont iconfont-e12e' } },
        { '/pc/breadcrumb/list/*': this.listBreadcrumbGenerator },
        { '/pc/breadcrumb/detail/*': this.detailBreadcrumbGenerator },
        { '/pc/breadcrumb/buy/*': this.buyBreadcrumbGenerator },
    ];

    public listBreadcrumbGenerator(routeNode: string): BreadcrumbNode | BreadcrumbNode[] {
        return this.getListNode(parseInt(routeNode));
    }

    public detailBreadcrumbGenerator(routeNode: string): BreadcrumbNode | BreadcrumbNode[] {
        // routeNode指当前url的最后一个节点，比如url为breadcrumb/router/detail/1这边的routeNode是1
        const detail = this.productService.getProductById(parseInt(routeNode));
        // 自定义面包屑节点
        return [
            // 节点的顺序是面包屑从左往右的显示顺序
            this.getListNode(detail.typeId),
            { label: detail.name }
        ];
    };

    public buyBreadcrumbGenerator(routeNode: string): BreadcrumbNode | BreadcrumbNode[] {
        // routeNode指当前url的最后一个节点，比如url为breadcrumb/router/buy/1这边的routeNode是1
        const detail = this.productService.getProductById(parseInt(routeNode));
        // 自定义面包屑节点
        return [
            // 节点的顺序是面包屑从左往右的显示顺序
            this.getListNode(detail.typeId),
            this.getDetailNode(detail),
            { label: 'Buy', icon: 'iconfont iconfont-e385' }
        ];
    }

    public getDetailNode(detail) {
        return { label: detail.name, routeLink: '/pc/breadcrumb/detail/' + detail.id } // 请尽量使用绝对路径
    }

    public getListNode(typeId) {
        let listNode;
        switch (typeId) {
            case 0:
                listNode = { label: 'Fruits', icon: 'iconfont iconfont-e135' };
                break;
            case 1:
                listNode = { label: 'Digital', icon: 'iconfont iconfont-e12e' };
                break;
            default:
                listNode = { label: 'Fruits', icon: 'iconfont iconfont-e135' };
        }
        listNode.routeLink = '/pc/breadcrumb/list/' + typeId; // 请尽量使用绝对路径
        return listNode;
    }

    public productTypeList = [
        { id: 0, name: 'Fruits' },
        { id: 1, name: 'Digital' }
    ];

    constructor(public productService: ProductService, http: HttpClient, el: ElementRef) {
        super(http, el);
    }
}
