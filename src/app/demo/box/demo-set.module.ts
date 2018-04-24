import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BoxJustifyDemoComponent} from "./justify/demo.component";
import {BoxLayoutDemoComponent} from "./layout/demo.component";
import {BoxJustifyDemoModule} from "./justify/demo.module";
import {BoxLayoutDemoModule} from "./layout/demo.module";
import {FormDemoComponent} from "./form/demo.component";
import {FormDemoModule} from "./form/demo.module";
import {BoxLayoutScrollDemoComponent} from "./scroll/demo.component";
import {BoxLayoutScrollDemoModule} from "./scroll/demo.module";

export const routerConfig = [
    {
        path: 'justify', component: BoxJustifyDemoComponent
    },
    {
        path: 'layout', component: BoxLayoutDemoComponent
    },
    {
        path: 'scroll', component: BoxLayoutScrollDemoComponent
    },
    {
        path: 'form', component: FormDemoComponent
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
export class BoxDemoModule {
}
