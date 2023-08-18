import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SwitchBasicDemoModule} from "./basic/demo.module";

import {SwitchBasicDemoComponent} from "./basic/demo.component";
import { SwitchSizeDemoComponent } from './size/demo.component';
import { SwitchSizeDemoModule } from './size/demo.module';

export const routerConfig = [
    {
        path: 'basic', component: SwitchBasicDemoComponent
    },
    {
        path: 'size', component: SwitchSizeDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        SwitchBasicDemoModule,
        SwitchSizeDemoModule,
    ]
})
export class SwitchDemoModule { }
