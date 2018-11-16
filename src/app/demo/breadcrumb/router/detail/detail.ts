import {Component, NgModule, OnInit} from "@angular/core";
import {ProductService} from "../product.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
    template: `
        name: {{product?.name}}<br>
        price: {{product?.price}}
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
    declarations: [BreadcrumbRouterDetail],
    exports: [ BreadcrumbRouterDetail],
    providers: [ProductService]
})
export class BreadcrumbRouterDetailModule{

}
