import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ButtonBasicDemoComponent} from "./basic/app.component";
import {ButtonDisableDemoComponent} from "./disabled/app.component";
import {ButtonWidthHeightDemoComponent} from "./width_height/app.component";
import {ButtonPresetDemoComponent} from "./preset/app.component";
import {ButtonWithLoadingComponent} from "./with-loading/app.component";
import {ButtonBasicDemoModule} from "./basic/app.module";
import {ButtonDisableDemoModule} from "./disabled/app.module";
import {ButtonPresetDemoModule} from "app/demo/button/preset/app.module";
import {ButtonWidthHeightDemoModule} from "app/demo/button/width_height/app.module";
import {ButtonWithLoadingModule} from "app/demo/button/with-loading/app.module";

const buttonDemoRoutes = [
    {
        path: '', redirectTo: 'basic', pathMatch: 'full'
    },
    {
        path: 'basic', component: ButtonBasicDemoComponent
    },
    {
        path: 'disable', component: ButtonDisableDemoComponent
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
        ButtonWithLoadingModule
    ]
})
export class ButtonDemoModule {
}
