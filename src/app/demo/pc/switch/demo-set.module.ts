import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import { SwitchSizeDemoComponent } from './size/demo.component';
import { SwitchSizeDemoModule } from './size/demo.module';
import {SwitchAllModule} from "./demo.module";
import {SwitchAllComponent} from "./demo.component";

export const routerConfig = [
    {
        path: 'all', component: SwitchAllComponent
    },
    {
        path: 'size', component: SwitchSizeDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        SwitchSizeDemoModule,
        SwitchAllModule
    ]
})
export class SwitchDemoModule { }
