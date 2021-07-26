import {Component} from "@angular/core";
import {map} from "rxjs/operators";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ProductService} from "../product.service";

@Component({
    template: `
        <ul class="demo-container">
            <li *ngFor="let product of productList">
                <a routerLink="/pc/breadcrumb/router/detail/{{product.id}}">{{product.name}}
                </a>
            </li>
        </ul>
    `,
    styles: [`
        .demo-container li:focus {
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
