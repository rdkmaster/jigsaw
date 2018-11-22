import {Component} from "@angular/core";

@Component({
    template: `
        <ul>
            <li><a routerLink="detail/0">apple</a></li>
            <li><a routerLink="detail/1">pear</a></li>
            <li><a routerLink="detail/2">orange</a></li>
        </ul>
        <hr>
        <router-outlet></router-outlet>
    `,
    styles: [`
        li:focus {
            outline: none;
        }
    `]
})
export class BreadcrumbRouterFruits {

}
