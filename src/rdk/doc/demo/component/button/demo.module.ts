import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ButtonBasicDemoComponent} from "./basic/basic";
import {ButtonDisableDemoComponent} from "./disabled/disabled";
import {RdkCheckBoxModule} from "../../../../component/checkbox/index";
import {RdkButtonModule} from "../../../../component/button/button";
import {ButtonWidthHeightDemoComponent} from "./width_height/width_height";
import {ButtonPresetDemoComponent} from "./preset/preset";
import {RdkLoadingModule} from "../../../../component/loading/loading";
import {ButtonWithLoadingComponent} from "./with-loading/demo";

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
    declarations: [
        ButtonBasicDemoComponent, ButtonDisableDemoComponent,ButtonWidthHeightDemoComponent,ButtonPresetDemoComponent,
        ButtonWithLoadingComponent
    ],
    imports: [
        RouterModule.forChild(buttonDemoRoutes), RdkCheckBoxModule, RdkButtonModule, RdkLoadingModule
    ],
    exports: [
    ],
    providers: []
})
export class ButtonDemoModule {
}
