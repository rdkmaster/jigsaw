import {Component, NgModule, OnInit} from "@angular/core";
import {ProductService} from "../product.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
    template: `
        <span>{{text}}</span>
    `
})
export class BreadcrumbRouterBuy implements OnInit {
    text = 'you are paying for this product...';

    ngOnInit() {
        setTimeout(() => {
            this.text = 'congratulations, payment successful!'
        }, 3000)
    }
}

@NgModule({
    declarations: [BreadcrumbRouterBuy],
    exports: [BreadcrumbRouterBuy],
    providers: [ProductService]
})
export class BreadcrumbRouterBuyModule {

}
