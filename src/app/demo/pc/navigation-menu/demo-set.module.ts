import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {NavigationMenuNavDemo} from "./navigation/demo.component";
import {NavigationMenuNavDemoModule} from "./navigation/demo.module";
import {NavigationMenuInlineDemoModule} from "./inline/demo.module";
import {NavigationMenuInlineDemo} from "./inline/demo.component";

export const routerConfig = [
    {
        path: 'navigation', component: NavigationMenuNavDemo
    },
    {
        path: 'inline', component: NavigationMenuInlineDemo
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), NavigationMenuNavDemoModule, NavigationMenuInlineDemoModule
    ]
})
export class NavigationMenuDemoModule {
}
