import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CascadingMenuDemo} from "./cascading-menu/demo.component";
import {CascadingMenuModule} from "./cascading-menu/demo.module";
import {MenuInDomDemo} from "./in-dom/demo.component";
import {MenuInDomDemoModule} from "./in-dom/demo.module";

export const routerConfig = [
    {
        path: 'in-dom', component: MenuInDomDemo
    },
    {
        path: 'cascading-menu', component: CascadingMenuDemo
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), MenuInDomDemoModule, CascadingMenuModule
    ]
})
export class MenuDemoModule {
}
