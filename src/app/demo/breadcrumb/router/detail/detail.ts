import {Component, NgModule, OnInit} from "@angular/core";
import {ProductService} from "../product.service";
import {ActivatedRoute, ParamMap, RouterModule} from "@angular/router";

@Component({
    template: `
        name: {{product?.name}}<br>
        price: {{product?.price}}<br>
        <a routerLink="buy">buy now</a>
        <hr>
        <router-outlet></router-outlet>
    `
})
export class BreadcrumbRouterDetail implements OnInit {
    constructor(public productService: ProductService, public route: ActivatedRoute) {

        this.product = this.route.paramMap.map((params: ParamMap) => {
            return this.productService.getProductById(parseInt(params.get('id')))
        })
    }
    product: any;

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.product = this.productService.getProductById(parseInt(params.get('id')))
        });
    }
}

@NgModule({
    imports: [RouterModule],
    declarations: [BreadcrumbRouterDetail],
    exports: [ BreadcrumbRouterDetail],
    providers: [ProductService]
})
export class BreadcrumbRouterDetailModule{

}
