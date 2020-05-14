import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CascadingMenuDemo} from "./cascade-menu/demo.component";
import {CascadingMenuModule} from "./cascade-menu/demo.module";
import {MenuInDomDemo} from "./in-dom/demo.component";
import {MenuInDomDemoModule} from "./in-dom/demo.module";

export const routerConfig = [
    {
        path: 'inDom', component: MenuInDomDemo
    },
    {
        path: 'cascade-menu', component: CascadingMenuDemo
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), MenuInDomDemoModule, CascadingMenuModule
    ]
})
export class MenuDemoModule {
}
