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
import {BoxMiddleResizeLineDemoComponent} from "./middle-resize-line/demo.component";
import {BoxMiddleResizeLineDemoModule} from "./middle-resize-line/demo.module";
import {BoxViewInitDemoComponent} from "./view-init/demo.component";
import {BoxViewInitDemoModule} from "./view-init/demo.module";
import {BoxPerformanceDemoComponent} from "./performance/demo.component";
import {BoxPerformanceDemoModule} from "./performance/demo.module";
import {BoxNgIfNgForDemoComponent} from "./ngIf&ngFor/demo.component";
import {BoxNgIfNgForDemoModule} from "./ngIf&ngFor/demo.module";

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
    {
        path: 'middle-resize-line', component: BoxMiddleResizeLineDemoComponent
    },
    {
        path: 'view-init', component: BoxViewInitDemoComponent
    },
    {
        path: 'performance', component: BoxPerformanceDemoComponent
    },
    {
        path: 'ngIf&ngFor', component: BoxNgIfNgForDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        BoxJustifyDemoModule,
        BoxLayoutDemoModule,
        FormDemoModule,
        BoxLayoutScrollDemoModule,
        BoxMiddleResizeLineDemoModule,
        BoxViewInitDemoModule,
        BoxPerformanceDemoModule,
        BoxNgIfNgForDemoModule
    ]
})
export class BoxDemoModule {
}
