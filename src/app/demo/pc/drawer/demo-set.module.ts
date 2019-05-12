import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DrawerBasicDemoModule} from "./basic/demo.module";
import {DrawerBasicDemoComponent} from "./basic/demo.component";
import {DrawerWithDivDemoComponent} from "./with-div/demo.component";
import {DrawerWithDivDemoModule} from "./with-div/demo.module";
import {DrawerInDomDemoComponent} from "./in-dom/demo.component";
import {DrawerInDomDemoModule} from "./in-dom/demo.module";
import {DrawerWithScrollbarDemoComponent} from "./with-scrollbar/demo.component";
import {DrawerWithScrollbarDemoModule} from "./with-scrollbar/demo.module";
import {DrawerWithTabDemoComponent} from "./with-tab/demo.component";
import {DrawerWithTabDemoModule} from "./with-tab/demo.module";
import {DrawerInDrawerDemoComponent} from "./drawer-in-drawer/demo.component";
import {DrawerInDrawerDemoModule} from "./drawer-in-drawer/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: DrawerBasicDemoComponent
    },
    {
        path: 'with-div', component: DrawerWithDivDemoComponent
    },
    {
        path: 'with-scrollbar', component: DrawerWithScrollbarDemoComponent
    },
    {
        path: 'with-tab', component: DrawerWithTabDemoComponent
    },
    {
        path: 'in-dom', component: DrawerInDomDemoComponent
    },
    {
        path: 'drawer-in-drawer', component: DrawerInDrawerDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        DrawerBasicDemoModule,
        DrawerWithDivDemoModule,
        DrawerWithScrollbarDemoModule,
        DrawerWithTabDemoModule,
        DrawerInDomDemoModule,
        DrawerInDrawerDemoModule
    ]
})
export class DrawerDemoModule {
}
