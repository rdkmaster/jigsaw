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
        {'breadcrumb/router/list/*': this.listBreadcrumbGenerator},
        {'breadcrumb/router/detail/*': this.detailBreadcrumbGenerator},
        {'breadcrumb/router/buy/*': this.buyBreadcrumbGenerator},
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
            {label: 'Buy', icon: 'fa fa-shopping-cart'}
        ];
    }

    getDetailNode(detail) {
        return {label: detail.name, routeLink: '/breadcrumb/router/detail/' + detail.id} // 请尽量使用绝对路径
    }

    getListNode(typeId) {
        let listNode;
        switch (typeId) {
            case 0:
                listNode = {label: 'Fruits', icon: 'fa fa-lemon-o'};
                break;
            case 1:
                listNode = {label: 'Digital', icon: 'fa fa-camera'};
                break;
            default:
                listNode = {label: 'Fruits', icon: 'fa fa-lemon-o'};
        }
        listNode.routeLink = '/breadcrumb/router/list/' + typeId; // 请尽量使用绝对路径
        return listNode;
    }

    productTypeList = [
        {id: 0, name: 'Fruits'},
        {id: 1, name: 'Digital'}
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '面包屑与路由搭配，只要设置好各级路由的信息，面包屑会自己根据路由状态生成路径';
    description: string = `
#### 关于路由配置里的 \`*\`

Angular的路由非常强大且灵活，当url的某段是由变量组成时，静态的路由信息无法搞定，此时可以使用 \`*\`
来替代，如果生成的面包屑的描述信息里需要使用到 \`*\` 匹配到的文本时，可以参考demo的源码，
提供一个生成面包屑节点信息的函数即可，面包屑组件会把匹配到的参数值文本传递给这个函数，
从而可以生成一个更加具体、生动的面包屑节点。
    `;
}

