import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BoxJustifyDemoComponent} from "./box-justify/app.component";
import {BoxLayoutDemoComponent} from "./box-layout/app.component";
import {BoxJustifyDemoModule} from "./box-justify/app.module";
import {BoxLayoutDemoModule} from "./box-layout/app.module";
import {FormDemoComponent} from "./form/app.component";
import {FormDemoModule} from "./form/app.module";
import {BoxLayoutScrollDemoComponent} from "./box-layout-scroll/app.component";
import {BoxLayoutScrollDemoModule} from "./box-layout-scroll/app.module";

export const routerConfig = [
    {
        path: 'box-justify', component: BoxJustifyDemoComponent
    },
    {
        path: 'box-layout', component: BoxLayoutDemoComponent
    },
    {
        path: 'form', component: FormDemoComponent
    },
    {
        path: 'box-layout-scroll', component: BoxLayoutScrollDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        BoxJustifyDemoModule,
        BoxLayoutDemoModule,
        FormDemoModule,
        BoxLayoutScrollDemoModule,
    ]
})
export class LayoutDemoModule {
}
