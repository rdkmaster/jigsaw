import {Component, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

@Component({
    template: `
        <ul>
            <li><a routerLink="3">phone</a></li>
            <li><a routerLink="4">pad</a></li>
            <li><a routerLink="5">computer</a></li>
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
export class BreadcrumbRouterDigital {

}

@NgModule({
    imports: [RouterModule],
    declarations: [BreadcrumbRouterDigital],
    exports: [ BreadcrumbRouterDigital]
})
export class BreadcrumbRouterDigitalModule{

}
