import {Component, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

@Component({
    template: `
        <ul>
            <li><a routerLink="detail/0">apple</a></li>
            <li><a routerLink="detail/1">pear</a></li>
            <li><a routerLink="detail/2">orange</a></li>
        </ul>
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

@NgModule({
    imports: [RouterModule],
    declarations: [BreadcrumbRouterFruits],
    exports: [ BreadcrumbRouterFruits]
})
export class BreadcrumbRouterFruitsModule{

}
