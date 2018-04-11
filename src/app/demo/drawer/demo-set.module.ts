import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DrawerBasicDemoModule} from "./basic/demo.module";
import {DrawerBasicDemoComponent} from "./basic/demo.component";

export const routerConfig = [
    {
        path: 'basic', component: DrawerBasicDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        DrawerBasicDemoModule
    ]
})
export class DrawerDemoModule {
}
