import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BoxJustifyDemoComponent} from "./box-justify/app.component";
import {BoxLayoutDemoComponent} from "./box-layout/app.component";
import {BoxJustifyDemoModule} from "./box-justify/app.module";
import {BoxLayoutDemoModule} from "./box-layout/app.module";

export const routerConfig = [
    {
        path: 'box-justify', component: BoxJustifyDemoComponent
    },
    {
        path: 'box-layout', component: BoxLayoutDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        BoxJustifyDemoModule,
        BoxLayoutDemoModule,
    ]
})
export class LayoutDemoModule {
}
