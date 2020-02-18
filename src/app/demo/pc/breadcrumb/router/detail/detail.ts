import {Component, OnInit} from "@angular/core";
import {map} from "rxjs/operators";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ProductService} from "../product.service";

@Component({
    template: `
        name: {{product?.name}}<br>
        price: {{product?.price}}<br>
        <a routerLink="/pc/breadcrumb/router/buy/{{product?.id}}">buy now</a>
    `
})
export class BreadcrumbRouterDetail implements OnInit {
    constructor(public productService: ProductService, public route: ActivatedRoute) {
        this.product = this.route.paramMap.pipe(map((params: ParamMap) => {
            return this.productService.getProductById(parseInt(params.get('id')))
        }));
    }

    product: any;

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.product = this.productService.getProductById(parseInt(params.get('id')))
        });
    }
}
