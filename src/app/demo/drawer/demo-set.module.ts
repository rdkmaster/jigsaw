import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DrawerBasicDemoModule} from "./basic/demo.module";
import {DrawerBasicDemoComponent} from "./basic/demo.component";
import {DrawerContainerDemoComponent} from "./container/demo.component";
import {DrawerContainerDemoModule} from "./container/demo.module";
import {DrawerInDomDemoComponent} from "./in-dom/demo.component";
import {DrawerInDomDemoModule} from "./in-dom/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: DrawerBasicDemoComponent
    },
    {
        path: 'container', component: DrawerContainerDemoComponent
    },
    {
        path: 'in-dom', component: DrawerInDomDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        DrawerBasicDemoModule,
        DrawerContainerDemoModule,
        DrawerInDomDemoModule
    ]
})
export class DrawerDemoModule {
}
