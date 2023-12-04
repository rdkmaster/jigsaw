import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ButtonBasicDemoModule} from "./basic/demo.module";
import {ButtonDisableDemoModule} from "./disabled/demo.module";
import {ButtonPresetDemoModule} from "app/for-internal/demo/pc/button/preset/demo.module";
import {ButtonWidthHeightDemoModule} from "app/for-internal/demo/pc/button/width-height/demo.module";
import {ButtonWithLoadingModule} from "app/for-internal/demo/pc/button/with-loading/demo.module";
import {ButtonFullModule} from "./full/demo.module";

import {ButtonFullComponent} from "./full/demo.component";
import {ButtonBasicDemoComponent} from "./basic/demo.component";
import {ButtonDisableDemoComponent} from "./disabled/demo.component";
import {ButtonWidthHeightDemoComponent} from "./width-height/demo.component";
import {ButtonPresetDemoComponent} from "./preset/demo.component";
import {ButtonWithLoadingComponent} from "./with-loading/demo.component";
import { ButtonIconDemoComponent } from './with-icon/demo.component';
import { ButtonIconDemoModule } from './with-icon/demo.module';
import { ButtonInstancesDemoComponent } from './instances/demo.component';
import { ButtonInstancesDemoModule } from './instances/demo.module';
import { ButtonBasicIconDemoComponent } from "./icon/demo.component";
import { ButtonBasicIconDemoModule } from "./icon/demo.module";

export const routerConfig = [
    {
        path: 'full', component: ButtonFullComponent
    },
    {
        path: 'basic', component: ButtonBasicDemoComponent
    },
    {
        path: 'disabled', component: ButtonDisableDemoComponent
    },
    {
        path: 'width-height', component: ButtonWidthHeightDemoComponent
    },
    {
        path: 'preset', component: ButtonPresetDemoComponent
    },
    {
        path: 'with-loading', component: ButtonWithLoadingComponent
    },
    {
        path: 'with-icon', component: ButtonIconDemoComponent
    },
    {
        path: 'instances', component: ButtonInstancesDemoComponent
    },
    {
        path: 'icon', component: ButtonBasicIconDemoComponent
    },
    {
        desc: 'with-chart-icon', url: '/pc/chart-icon/with-button'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ButtonBasicDemoModule,
        ButtonDisableDemoModule,
        ButtonPresetDemoModule,
        ButtonWidthHeightDemoModule,
        ButtonWithLoadingModule,
        ButtonFullModule,
        ButtonIconDemoModule,
        ButtonInstancesDemoModule,
        ButtonBasicIconDemoModule
    ]
})
export class ButtonDemoModule {
}
