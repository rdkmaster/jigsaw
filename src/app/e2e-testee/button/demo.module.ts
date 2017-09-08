import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ButtonBasicDemoComponent} from "./basic/app.component";
import {ButtonDisableDemoComponent} from "./disabled/app.component";
import {ButtonWidthHeightDemoComponent} from "./width_height/app.component";
import {ButtonPresetDemoComponent} from "./preset/app.component";
import {ButtonWithLoadingComponent} from "./with-loading/app.component";
import {ButtonBasicDemoModule} from "./basic/app.module";
import {ButtonDisableDemoModule} from "./disabled/app.module";
import {ButtonPresetDemoModule} from "app/e2e-testee/button/preset/app.module";
import {ButtonWidthHeightDemoModule} from "app/e2e-testee/button/width_height/app.module";
import {ButtonWithLoadingModule} from "app/e2e-testee/button/with-loading/app.module";
import {ButtonFullComponent} from "../../live-demo/button/button-full/app.component";
import {ButtonFullModule} from "../../live-demo/button/button-full/app.module";

const buttonDemoRoutes = [
    {
        path: 'button-full', component: ButtonFullComponent
    },
    {
        path: 'basic', component: ButtonBasicDemoComponent
    },
    {
        path: 'disabled', component: ButtonDisableDemoComponent
    },
    {
        path: 'width_height', component: ButtonWidthHeightDemoComponent
    },
    {
        path: 'preset', component: ButtonPresetDemoComponent
    },
    {
        path: 'with-loading', component: ButtonWithLoadingComponent
    },
    {
        path: '**', //fallback router must in the last
        component: ButtonFullComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(buttonDemoRoutes),
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
