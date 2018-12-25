import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DrawerBasicDemoModule} from "./basic/demo.module";
import {DrawerBasicDemoComponent} from "./basic/demo.component";
import {DrawerContainerDemoComponent} from "./container/demo.component";
import {DrawerContainerDemoModule} from "./container/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: DrawerBasicDemoComponent
    },
    {
        path: 'container', component: DrawerContainerDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        DrawerBasicDemoModule,
        DrawerContainerDemoModule
    ]
})
export class DrawerDemoModule {
}
