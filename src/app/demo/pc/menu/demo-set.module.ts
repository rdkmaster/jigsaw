import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {MenuOptionsDemo} from "./options/demo.component";
import {MenuOptionsModule} from "./options/demo.module";
import {MenuInDomDemo} from "./in-dom/demo.component";
import {MenuInDomDemoModule} from "./in-dom/demo.module";
import {MenuInDialogDemo} from './in-dialog/demo.component';
import {MenuInDialogDemoModule} from './in-dialog/demo.module';
import {MenuUsageDemo} from "./usage/demo.component";
import {MenuUsageDemoModule} from "./usage/demo.module";
import {NavigationMenuNavDemo} from "./navigation/demo.component";
import {NavigationMenuInlineDemo} from "./inline/demo.component";
import {NavigationMenuInlineDemoModule} from "./inline/demo.module";
import {NavigationMenuNavDemoModule} from "./navigation/demo.module";

export const routerConfig = [
    {
        path: 'in-dom', component: MenuInDomDemo
    },
    {
        path: 'in-dialog', component: MenuInDialogDemo
    },
    {
        path: 'options', component: MenuOptionsDemo
    },
    {
        path: 'usage', component: MenuUsageDemo
    },
    {
        path: 'navigation', component: NavigationMenuNavDemo
    },
    {
        path: 'inline', component: NavigationMenuInlineDemo
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), MenuInDomDemoModule, MenuOptionsModule, MenuInDialogDemoModule,
        MenuUsageDemoModule, NavigationMenuInlineDemoModule, NavigationMenuNavDemoModule
    ]
})
export class MenuDemoModule {
}
