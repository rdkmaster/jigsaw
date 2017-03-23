

import {NgModule} from "@angular/core";
import {ButtonComponent} from "../../../../component/button/button";
import {RouterModule} from "@angular/router";
import {buttonDemoRoutes} from "./button-demo.routes";
import {ButtonBasicDemoComponent} from "./basic/basic";
import {RdkCheckBoxModule} from "../../../../component/checkbox/index";
import {ButtonDisableDemoComponent} from "./disabled/disabled";

@NgModule({
    declarations: [
        ButtonComponent,
        ButtonBasicDemoComponent, ButtonDisableDemoComponent
    ],
    imports: [
        RouterModule.forChild(buttonDemoRoutes), RdkCheckBoxModule
    ],
    exports: [
        ButtonBasicDemoComponent, ButtonDisableDemoComponent
    ],
    providers: []
})
export class ButtonDemoModule { }
