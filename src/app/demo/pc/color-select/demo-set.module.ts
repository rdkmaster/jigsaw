import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ColorSelectBasicDemoComponent} from "./basic/demo.component";
import {ColorSelectBasicDemoModule} from "./basic/demo.module";
import {ColorSelectPreSizeDemoModule} from "./pre-size/demo.module";
import {ColorSelectPreSizeDemoComponent} from "./pre-size/demo.component";
import {ColorSelectModeDemoComponent} from "./mode/demo.component";
import {ColorSelectModeDemoModule} from "./mode/demo.module";
import {ColorSelectConfirmDemoComponent} from "./confirm/demo.component";
import {ColorSelectConfirmDemoModule} from "./confirm/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: ColorSelectBasicDemoComponent
    }, {
        path: 'confirm', component: ColorSelectConfirmDemoComponent
    }, {
        path: 'mode', component: ColorSelectModeDemoComponent
    }, {
        path: 'pre-size', component: ColorSelectPreSizeDemoComponent
    },

];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), ColorSelectBasicDemoModule, ColorSelectPreSizeDemoModule,
        ColorSelectModeDemoModule, ColorSelectConfirmDemoModule
    ]
})
export class ColorSelectDemoModule {
}
