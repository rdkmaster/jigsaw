import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ButtonBarBasicDemoComponent} from "./basic/demo.component";
import {ButtonBarBasicDemoModule} from "./basic/demo.module";
import {ButtonBarThemeDemoComponent} from './theme/demo.component';
import {ButtonBarThemeDemoModule} from './theme/demo.module';
import {ButtonBarSizeDemoComponent} from "./size/demo.component";
import {ButtonBarSizeDemoModule} from "./size/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: ButtonBarBasicDemoComponent
    },
    {
        path: 'theme', component: ButtonBarThemeDemoComponent
    },
    {
        path: 'size', component: ButtonBarSizeDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ButtonBarBasicDemoModule,
        ButtonBarThemeDemoModule,
        ButtonBarSizeDemoModule
    ]
})
export class ButtonBarDemoModule {
}
