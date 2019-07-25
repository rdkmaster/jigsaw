import {Component} from "@angular/core";
import {map} from "rxjs/operators";
import {ProductService} from "../product.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
    template: `
        <ul>
            <li *ngFor="let product of productList"><a routerLink="/pc/breadcrumb/router/detail/{{product.id}}">{{product.name}}</a></li>
        </ul>
    `,
    styles: [`
        li:focus {
            outline: none;
        }
    `]
})
export class BreadcrumbRouterList {
    constructor(public productService: ProductService, public route: ActivatedRoute) {
        this.productList = this.route.paramMap.pipe(map((params: ParamMap) => {
            return this.productService.getProductListByTypeId(parseInt(params.get('typeId')))
        }));
    }

    productList: any;

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.productList = this.productService.getProductListByTypeId(parseInt(params.get('typeId')))
        });
    }
}
