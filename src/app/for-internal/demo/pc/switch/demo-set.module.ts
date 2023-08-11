import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SwitchBasicDemoModule} from "./basic/demo.module";

import {SwitchBasicDemoComponent} from "./basic/demo.component";
import { SwitchSizeDemoComponent } from './size/demo.component';
import { SwitchSizeDemoModule } from './size/demo.module';
import { SwitchShowBorderDemoComponent } from "./show-border/demo.component";
import { SwitchShowBorderDemoModule } from "./show-border/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: SwitchBasicDemoComponent
    },
    {
        path: 'show-border', component: SwitchShowBorderDemoComponent
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
        SwitchShowBorderDemoModule
    ]
})
export class SwitchDemoModule { }
