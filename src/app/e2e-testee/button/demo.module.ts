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
import {ButtonLiveDemoComponent} from "../../live-demo/button/app.component";
import {ButtonLiveDemoModule} from "../../live-demo/button/app.module";

const buttonDemoRoutes = [
    {
        path: '', redirectTo: 'basic', pathMatch: 'full'
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
        path: 'live-demo', component: ButtonLiveDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: ButtonBasicDemoComponent
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
        ButtonLiveDemoModule
    ]
})
export class ButtonDemoModule {
}
