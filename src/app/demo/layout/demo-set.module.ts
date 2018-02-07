import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BoxJustifyDemoComponent} from "./box-justify/demo.component";
import {BoxLayoutDemoComponent} from "./box-layout/demo.component";
import {BoxJustifyDemoModule} from "./box-justify/demo.module";
import {BoxLayoutDemoModule} from "./box-layout/demo.module";
import {FormDemoComponent} from "./form/demo.component";
import {FormDemoModule} from "./form/demo.module";
import {BoxLayoutScrollDemoComponent} from "./box-layout-scroll/demo.component";
import {BoxLayoutScrollDemoModule} from "./box-layout-scroll/demo.module";

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
