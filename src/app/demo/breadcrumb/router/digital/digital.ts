import {Component} from "@angular/core";

@Component({
    template: `
        <ul>
            <li><a routerLink="3">phone</a></li>
            <li><a routerLink="4">pad</a></li>
            <li><a routerLink="5">computer</a></li>
        </ul>
        <hr>
    `,
    styles: [`
        li:focus {
            outline: none;
        }
    `]
})
export class BreadcrumbRouterDigital {

}
