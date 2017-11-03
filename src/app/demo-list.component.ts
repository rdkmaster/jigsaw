

import {Component} from "@angular/core";
import {routes} from "./demo-urls";

@Component({
    template: `
        fdfdfdf
        <div *ngFor="let comp of routes">
            <h2>{{comp.path}}</h2>
            <hr>
            <ul *ngFor="let demo of comp.childRoutes">
                <li>{{demo.path}}</li>
            </ul>
        </div>
    `
})
export class DemoListComponent {
    routes = routes.config;
}
