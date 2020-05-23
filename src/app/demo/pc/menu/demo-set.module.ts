import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CascadingMenuOptionsDemo as MenuOptionsDemo} from "./options/demo.component";
import {CascadingMenuOptionsModule as MenuOptionsModule} from "./options/demo.module";
import {MenuInDomDemo} from "./in-dom/demo.component";
import {MenuInDomDemoModule} from "./in-dom/demo.module";
import { MenuInDialogDemo } from './in-dialog/demo.component';
import { MenuInDialogDemoModule } from './in-dialog/demo.module';

export const routerConfig = [
    {
        path: 'in-dom', component: MenuInDomDemo
    },
    {
        path: 'in-dialog', component: MenuInDialogDemo
    },
    {
        path: 'options', component: MenuOptionsDemo
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), MenuInDomDemoModule, MenuOptionsModule, MenuInDialogDemoModule
    ]
})
export class MenuDemoModule {
}
