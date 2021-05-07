import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ButtonBarBasicDemoComponent} from "./basic/demo.component";
import {ButtonBarBasicDemoModule} from "./basic/demo.module";
import { ButtonBarThemeDemoComponent } from './theme/demo.component';
import { ButtonBarThemeDemoModule } from './theme/demo.module';

export const routerConfig = [
    {
        path: 'basic', component: ButtonBarBasicDemoComponent
    },
    {
        path: 'color-type', component: ButtonBarThemeDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ButtonBarBasicDemoModule,
        ButtonBarThemeDemoModule
    ]
})
export class ButtonBarDemoModule { }
