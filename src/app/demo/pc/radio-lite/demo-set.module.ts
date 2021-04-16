import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {RadioLiteBasicDemoModule} from "./basic/demo.module";
import {RadioLiteBasicDemoComponent} from "./basic/demo.component";
import { RadioLiteTypeDemoComponent } from './type/demo.component';
import { RadioLiteTypeDemoModule } from './type/demo.module';

export const routerConfig = [
    {
        path: 'basic', component: RadioLiteBasicDemoComponent
    },
    {
        path: 'type', component: RadioLiteTypeDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        RadioLiteBasicDemoModule,
        RadioLiteTypeDemoModule
    ]
})
export class RadioLiteDemoModule { }
