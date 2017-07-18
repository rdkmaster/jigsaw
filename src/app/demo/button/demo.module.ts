import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawLoadingModule} from "jigsaw/component/loading/loading";
import {ButtonBasicDemoComponent} from "./basic/basic";
import {ButtonDisableDemoComponent} from "./disabled/disabled";
import {ButtonWidthHeightDemoComponent} from "./width_height/width_height";
import {ButtonPresetDemoComponent} from "./preset/preset";
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
        RouterModule.forChild(buttonDemoRoutes), JigsawCheckBoxModule, JigsawButtonModule, JigsawLoadingModule
    ],
    exports: [
    ],
    providers: []
})
export class ButtonDemoModule {
}
