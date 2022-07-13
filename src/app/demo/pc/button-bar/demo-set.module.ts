import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ButtonBarThemeDemoComponent} from './theme/demo.component';
import {ButtonBarThemeDemoModule} from './theme/demo.module';
import {ButtonBarSizeDemoComponent} from "./size/demo.component";
import {ButtonBarSizeDemoModule} from "./size/demo.module";
import {ButtonBarAllModule} from "./demo.module";
import {ButtonBarAllComponent} from "./demo.component";

export const routerConfig = [
    {
        path: 'all', component: ButtonBarAllComponent
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
        ButtonBarThemeDemoModule,
        ButtonBarSizeDemoModule,
        ButtonBarAllModule
    ]
})
export class ButtonBarDemoModule {
}
