import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {MenuOptionsDemo} from "./options/demo.component";
import {MenuOptionsModule} from "./options/demo.module";
import {MenuInDialogDemo} from './in-dialog/demo.component';
import {MenuInDialogDemoModule} from './in-dialog/demo.module';
import {MenuUsageDemo} from "./usage/demo.component";
import {MenuUsageDemoModule} from "./usage/demo.module";
import {NavigationMenuNavDemo} from "./navigation/demo.component";
import {NavigationMenuInlineDemo} from "./nav-inline/demo.component";
import {NavigationMenuInlineDemoModule} from "./nav-inline/demo.module";
import {NavigationMenuNavDemoModule} from "./navigation/demo.module";
import { MenuMaxHeightDemoModule } from "./max-height/demo.module";
import { MenuMaxHeightDemo } from "./max-height/demo.component";

export const routerConfig = [
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
        path: 'nav-inline', component: NavigationMenuInlineDemo
    },
    {
        path: 'max-height', component: MenuMaxHeightDemo
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), MenuOptionsModule, MenuInDialogDemoModule,
        MenuUsageDemoModule, NavigationMenuInlineDemoModule, NavigationMenuNavDemoModule,
        MenuMaxHeightDemoModule
    ]
})
export class MenuDemoModule {
}
