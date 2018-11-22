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
    summary: string = '面包屑与路由搭配，只要设置好各级路由的信息，面包屑会自己根据路由状态生成路径';
    description: string = `
#### 关于路由配置里的 \`*\`

Angular的路由非常强大且灵活，当url的某段是由变量组成时，静态的路由信息无法搞定，此时可以使用 \`*\`
来替代，如果生成的面包屑的描述信息里需要使用到 \`*\` 匹配到的文本时，可以参考demo的源码，
提供一个生成面包屑节点信息的函数即可，面包屑组件会把匹配到的参数值文本传递给这个函数，
从而可以生成一个更加具体、生动的面包屑节点。
    `;
}

