import {Component, OnInit} from "@angular/core";

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
        }, 2000)
    }
}
