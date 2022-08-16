import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {RadioLiteBasicDemoModule} from "./basic/demo.module";
import {RadioLiteBasicDemoComponent} from "./basic/demo.component";
import { RadioLiteTypeDemoComponent } from './type/demo.component';
import { RadioLiteTypeDemoModule } from './type/demo.module';
import { RadioLiteDisabledDemoModule } from './disabled/demo.module';
import { RadioLiteDisabledDemoComponent } from './disabled/demo.component';

export const routerConfig = [
    {
        path: 'basic', component: RadioLiteBasicDemoComponent
    },
    {
        path: 'type', component: RadioLiteTypeDemoComponent
    },
    {
        path: 'disabled', component: RadioLiteDisabledDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        RadioLiteBasicDemoModule,
        RadioLiteTypeDemoModule,
        RadioLiteDisabledDemoModule
    ]
})
export class RadioLiteDemoModule { }
