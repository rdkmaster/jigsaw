import {Component} from "@angular/core";

@Component({
    template: `
        <ul>
            <li><a routerLink="/breadcrumb/router/detail/0">apple</a></li>
            <li><a routerLink="/breadcrumb/router/detail/1">pear</a></li>
            <li><a routerLink="/breadcrumb/router/detail/2">orange</a></li>
        </ul>
        <hr>
    `,
    styles: [`
        li:focus {
            outline: none;
        }
    `]
})
export class BreadcrumbRouterFruits {

}
