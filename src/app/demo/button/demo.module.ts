import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ButtonBasicDemoModule} from "./basic/app.module";
import {ButtonDisableDemoModule} from "./disabled/app.module";
import {ButtonPresetDemoModule} from "app/demo/button/preset/app.module";
import {ButtonWidthHeightDemoModule} from "app/demo/button/width-height/app.module";
import {ButtonWithLoadingModule} from "app/demo/button/with-loading/app.module";
import {ButtonFullModule} from "./full/app.module";

import {ButtonFullComponent} from "./full/app.component";
import {ButtonBasicDemoComponent} from "./basic/app.component";
import {ButtonDisableDemoComponent} from "./disabled/app.component";
import {ButtonWidthHeightDemoComponent} from "./width-height/app.component";
import {ButtonPresetDemoComponent} from "./preset/app.component";
import {ButtonWithLoadingComponent} from "./with-loading/app.component";

export const routerConfig = [
    {
        path: 'full', component: ButtonFullComponent, recommended: true
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
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ButtonBasicDemoModule,
        ButtonDisableDemoModule,
        ButtonPresetDemoModule,
        ButtonWidthHeightDemoModule,
        ButtonWithLoadingModule,
        ButtonFullModule
    ]
})
export class ButtonDemoModule {
}
