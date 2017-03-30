import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ButtonBasicDemoComponent} from "./basic/basic";
import {ButtonDisableDemoComponent} from "./disabled/disabled";
import {RdkCheckBoxModule} from "../../../../component/checkbox/index";
import {RdkButtonModule} from "../../../../component/button/button";
import {ButtonWidthHeightDemoComponent} from "./width_height/width_height";

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
        path: '**', //fallback router must in the last
        component: ButtonBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        ButtonBasicDemoComponent, ButtonDisableDemoComponent,ButtonWidthHeightDemoComponent
    ],
    imports: [
        RouterModule.forChild(buttonDemoRoutes), RdkCheckBoxModule, RdkButtonModule
    ],
    exports: [
        ButtonBasicDemoComponent, ButtonDisableDemoComponent
    ],
    providers: []
})
export class ButtonDemoModule {
}
